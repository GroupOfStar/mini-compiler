import { Token, TokenTypes } from "./tokenizer";
import {
  ChildNode,
  RootNode,
  createCallExpression,
  createNumberLiteralNode,
  createRootNode,
  createStringLiteralNode
} from "./ast";

export const parser = (tokens: Token[]): RootNode => {
  const ast = createRootNode();
  let children: ChildNode[] = ast.body;
  for (let index = 0; index < tokens.length; index++) {
    const item = tokens[index];
    switch (item.type) {
      case TokenTypes.Paren:
        break;
      case TokenTypes.Name:
        const nameNode = createCallExpression(item.value);
        children.push(nameNode);
        children = nameNode.params;
        break;
      case TokenTypes.Number:
        const numberNode = createNumberLiteralNode(item.value);
        children.push(numberNode);
        break;
      case TokenTypes.String:
        const stringNode = createStringLiteralNode(item.value);
        children.push(stringNode);
        break;
    }
  }
  return ast
};
