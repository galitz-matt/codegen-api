# Name TBD

## Problem Statement

Programmatic generation of TS source code is commonly implemented via string concatenation. This approach does not scale well with complexity. Particularly, this approach:
* conflates layoutmanagement with surface syntax construction
* requires manual depth tracking
* introduces fragile formatting logic

This project introduces a minimal structural layout algebra that models document nesting explicitly. 

## Algebra of Layout

### Preliminaries
Let:
* $String$ be the set of all strings
* $List(X)# denote ordered finite lists over set $X$

### Def'n 1: Layout Node
A layout node is defined inductively as

$$Node := Line(s) | Block(open, body, close) | Seq(nodes)$$

where:
* $s \in String$
* $open, close \in String$
* $body \in List(Node)$
* $nodes \in List(Node)$

We define $Line(s)$, $Block(open, body, close)$, $Seq(nodes)$ below

### Def'n 2: Line
$$Line(s)$$

A $Line$ represents a single text unit rendered at a given indentation depth.
It is a leaf in the layout tree.

### Def'n 3: Block
$$Block(open, body, close)$$

A $Block$ introduces structurual nesting. Its body is rendered at indentation depth $d + 1$, its delimiters ($open$, $close$) at depth $d$

### Def'n 4: Seq
$$Seq(nodes)$$

A $Seq$ represents ordered sibling composition. It does not introduce indentation; each child is rendered at the same depth.

### Def'n 5: Document
A $Document$ is defined as:

$$Document := Node$$

In practice, a file is represented as:

$$Seq(nodes)$$

The root is simply a $Node$.
This ensures the layout algebra is closed which enables composability which we see below.

### Def'n 5: Rendering
Let:

$$render: Node x \N \rightarrow String$$

where the second argument denotes indentation depth.
Let `indent(d)` denote a string consisting of `d` tab characters.

**Line**
$$render(Line(s), d) = indent(d) + s$$

**Block**
$$
render(Block(open, body, close), d) =\\
    indent(d) + open\\
    + newline\\
    render(body, d+1)\\
    + newline\\
    indent(d) + close
$$

**Seq**
$$
render(Seq(nodes), d) =\\
    join(render(n, d) \text{ for each } n \in nodes \text{ with newline})
$$

Rendering derives indentation from structural depth.

## Lowering

### Def'n 6: Surface Syntax Fragment
A surface syntax fragment represents a TS construct at a semantic level.
Examples include:
* Function declarations
* Conditional chains
* Loop constructs
* Parameter lists

Fragments describe semantic structure.

### Def'n 7:
A lowering function is a total function:

$$ lower_C: C \rightarrow Node $$

where:
* C is a TS surface construct.

* The output is a layout $Node$

Lowering encodes surface syntax into layout nodes.

## Design Considerations

### Structural Closure
The layout algebra must be closed under lowering.

Formally:

$$\forall C, \exists lower_C : C \rightarrow Node$$

This requirement motivated the inclusion of $Seq$

Without $Seq$, certain constructs (e.g. if-chains) would lower to multiple sibling nodes, breaking closure.

$Seq$ serves as the composition operator that ensures:

$$ Node \times Node \rightarrow Node$$

### Why Closure is Useful (in practice)
Recall, closure in this context means:

every lowering function returns a $Node$

Formally:
$$lower_C: C \rightarrow Node$$

This ensures every construct is composable.

Without closure some lowering functions return `Node`, others `Node[]`

We illustrate why this is problematic with an example:

Suppose we have the lowering function `ifChain` which lowers to multiple sibling blocks representing the branches:

```typescript
if (x) { ... }
else if (y) { ... }
else { ... }
```

Without $Seq$, `ifChain` must return `Node[]`. Now our lowering functions must handle two shapes, which forces spreads, flattening and special cases which is bad for ergonomics.

Composition would look like:

```typescript
fn(signature,
    line("..."),
    ...ifChain(...),
)
```

The user must know that `ifChain` returns many which is leaky.
With `Seq`, `ifChain` returns:

```typescript
seq(
    block(if ...),
    block(else if ...),
    block(else ...)
)
```
which is `Node`. Composition is now uniform:

```typescript
fn(sig,
    line("..."),
    ifChain(...)
)
```

The user is free to compose structures without thinking about underlying representation.

## Guarantees
The system guarantees
* Proper indentation
* Proper nesting
* Determinstic formatting

It does not validate
* Type correctness
* TS grammar correctness
* Semantic validity
