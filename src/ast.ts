export enum NodeTypes {
  NumberLiteral = "NumberLiteral",
  Program = "Program",
  StringLiteral = "StringLiteral",
  CallExpression = "CallExpression"
}

export type ChildNode =
  | NumberLiteralNode
  | CallExpressionNode
  | StringLiteralNode;

export interface Node {
  type: NodeTypes;
  [key: string]: any;
}

export interface NumberLiteralNode extends Node {
  type: NodeTypes.NumberLiteral;
  value: string;
}

export interface StringLiteralNode extends Node {
  value: string;
  type: NodeTypes.StringLiteral;
}

export interface CallExpressionNode extends Node {
  type: NodeTypes.CallExpression;
  name: string;
  params: ChildNode[];
}

export interface RootNode extends Node {
  type: NodeTypes.Program;
  body: ChildNode[];
}

export function createRootNode(): RootNode {
  return {
    type: NodeTypes.Program,
    body: []
  };
}

export function createCallExpression(name: string): CallExpressionNode {
  return {
    type: NodeTypes.CallExpression,
    name,
    params: []
  };
}

export function createNumberLiteralNode(value: string): NumberLiteralNode {
  return {
    type: NodeTypes.NumberLiteral,
    value
  };
}

export function createStringLiteralNode(value: string): StringLiteralNode {
  return {
    type: NodeTypes.StringLiteral,
    value
  };
}
