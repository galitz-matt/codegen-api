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

export type Node = 
    | Line 
    | Block


export type Document = Node[]