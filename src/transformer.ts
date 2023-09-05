import { NodeTypes, RootNode, ChildNode } from "./ast";
import { traverser } from "./traverser";

export const transformer = (ast: RootNode) => {
  return traverser(ast, {
    Program: {
      exit(node, parent) {
        return { ...node };
      }
    },
    CallExpression: {
      exit(node, parent) {
        const expression: any = {
          type: node.type,
          callee: {
            type: "Identifier",
            name: node.name
          },
          arguments: [...node.params]
        };
        if (parent?.type !== NodeTypes.CallExpression) {
          return {
            type: "ExpressionStatement",
            expression: { ...expression }
          };
        } else {
          return expression;
        }
      }
    },
    NumberLiteral: {
      exit(node, parent) {
        if (node.type === NodeTypes.NumberLiteral) {
          return { type: node.type, value: node.value };
        } else {
          return { ...node };
        }
      }
    }
  });
};
