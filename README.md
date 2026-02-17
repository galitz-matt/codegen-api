# NAME TBD

## Problem Statement
Programmatic generation of TS source code is frequently implemented using string construction. This approach conflates layout management with syntax construction, resulting in fragile formatting logic and limited composability.

This project introduces a minimal structural layout representation that decouples nesting and indentation from surface syntax assembly, and TS-specific builders lower semantic fragments into layout primitives.

## Scope
This system guarantees structural layout correctness.
It does not guarantee syntactic or semantic correctness of TS.

## Definitions

### Preliminaries
* Let $String$ be the set of all TS strings
* Let $List(Node)$ be the set of all lists of layout tree nodes

### Def'n 1: Layout Tree
A layout tree is a finite ordered tree whose nodes represent layout units of a document.

Each node is one of:
1. A line
2. A block
3. A sequence

### Def'n 2: Line
A line is a node defined as:

$$Line(s)$$ 

where: 
* $s \in String$

A line is:
* atomic
* has no children

It is a leaf in the layout tree

### Def'n 3: Block
A block is a node defined as:


$$Block(open, body, close)$$

where:
* $open, close \in String$
* $body \in List(Node)$

A block introduces structural nesting. The body is rendered at one greater indentation depth than the block itself.

*Note:* Indentation is not intrinsic to the node, it is a rendering concern

### Def'n 4: Document
A document is an ordered list of layout nodes:

$$Document := List(Node)$$

A document represents the root of the layout tree (or subtree)

*Note:* The root is not itself a $Node$. It is a sequence of sibling nodes rendered at indentation depth 0.

### Def'n 5: Rendering
Let:

$$render : Document \times \N \rightarrow String$$

be a total function defined recursively.

Let $indent(d)$ denote a string consisting of $d$ tab characters.

Then:

#### Line case
$$render(Line(s), d) = indent(d) + s$$

#### Block case
$$
render(Block(open, body, close), d) =\\
indent(d) + open\\
+ newline\\
+ render(body, d + 1)\\
+ newline \\
+ indent(d) + close
$$

#### Document case
$$
render(Document(nodes)) =\\
    join(render(n, d) \text{ for each } n \in nodes \text{ with newline})
$$

## Def'n 6: Surface Syntax Fragment
Let $TSFragment$ denote a structured representation of a TS surface construct

Examples include:
* Function declarations
* Conditional branches
* Loop constructs
* Parameter lists

TSFragment is a semantic  description of a construct

## Def'n 7: Lowering
A lowering function is a total function of the form

$$lower_C : C \rightarrow Document$$

where:
* $C$ is a TypeScript surface construct
* The output is a $Document$
* Lowering **does not** perform rendering

**Example**
$$forLoop: String \times Document \right Document$$

## Invariants
For all layout trees:
1. The tree is finite
2. All children of a $Block$ are rendered at depth + 1
3. Indentation depth is derived from tree depth, not stored
4. Every $Block$ has exactly one opening and closing delimiter
5. Rendering is deterministic
6. Every TS construct lowers to a $Document$

