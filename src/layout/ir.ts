export type Line = { 
    kind: "line"; 
    text: string 
}

export type Block = { 
    kind: "block"; 
    open: string; 
    body: Document;
    close: string;
}

export type Seq = {
    kind: "seq";
    nodes: Node[];
}

export type Node = 
    | Line 
    | Block
    | Seq


export type Document = Node