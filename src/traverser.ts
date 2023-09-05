import { CallExpressionNode, ChildNode, NodeTypes, RootNode } from "./ast";

type ParentNode = RootNode | CallExpressionNode | undefined;

interface VisitorOption<T extends RootNode | ChildNode> {
  enter?: (node: T, parent: ParentNode) => void;
  exit?: (node: T, parent: ParentNode) => T;
}

export interface Visitor {
  Program?: VisitorOption<RootNode>;
  NumberLiteral?: VisitorOption<ChildNode>;
  CallExpression?: VisitorOption<ChildNode>;
  StringLiteral?: VisitorOption<ChildNode>;
}

interface TraveNode {
  <T extends RootNode | ChildNode>(node: T, parent: ParentNode): T;
}

export const traverser = (rootNode: RootNode, visitor: Visitor): RootNode => {
  const traveArray = (nodes: ChildNode[], parent?: ParentNode) => {
    return nodes.map(node => traveNode(node, parent));
  };

  const traveNode: TraveNode = (node, parent) => {
    const method = visitor[node.type];
    if (method && method.enter) {
      method.enter(node as any, parent);
    }

    const exitMethod = () => {
      if (method && method.exit) {
        return method.exit(node as any, parent);
      } else {
        return node;
      }
    };

    switch (node.type) {
      case NodeTypes.Program: {
        node.body = traveArray(node.body, node);
        return exitMethod() as any;
      }
      case NodeTypes.CallExpression: {
        node.params = traveArray(node.params, node);
        return exitMethod() as ChildNode;
      } 
      case NodeTypes.NumberLiteral:
      case NodeTypes.StringLiteral:
      default:
        return exitMethod() as ChildNode;
    }
  };

  return traveNode(rootNode, undefined);
};
