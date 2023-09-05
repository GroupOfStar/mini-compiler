import { test, expect, describe } from "vitest";
import { NodeTypes } from "./ast";
import { codein } from "./codein";

describe("codein", () => {
  test("codein", () => {
    const ast = {
      type: NodeTypes.Program,
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "add"
            },
            arguments: [
              {
                type: "NumberLiteral",
                value: "2"
              },
              {
                type: "CallExpression",
                callee: {
                  type: "Identifier",
                  name: "subtract"
                },
                arguments: [
                  {
                    type: "NumberLiteral",
                    value: "4"
                  },
                  {
                    type: "NumberLiteral",
                    value: "2"
                  }
                ]
              }
            ]
          }
        }
      ]
    };

    expect(codein(ast)).toMatchInlineSnapshot('"add(2, subtract(4, 2));"');
  });

  test("two ExpressionStatement", () => {
    const ast = {
      type: NodeTypes.Program,
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "add"
            },
            arguments: [
              {
                type: "NumberLiteral",
                value: "2"
              },
              {
                type: "CallExpression",
                callee: {
                  type: "Identifier",
                  name: "subtract"
                },
                arguments: [
                  {
                    type: "NumberLiteral",
                    value: "4"
                  },
                  {
                    type: "NumberLiteral",
                    value: "2"
                  }
                ]
              }
            ]
          }
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "add"
            },
            arguments: [
              {
                type: "NumberLiteral",
                value: "2"
              },
              {
                type: "CallExpression",
                callee: {
                  type: "Identifier",
                  name: "subtract"
                },
                arguments: [
                  {
                    type: "NumberLiteral",
                    value: "4"
                  },
                  {
                    type: "NumberLiteral",
                    value: "2"
                  }
                ]
              }
            ]
          }
        }
      ]
    };

    expect(codein(ast)).toMatchInlineSnapshot(
      '"add(2, subtract(4, 2));add(2, subtract(4, 2));"'
    );
  });
});
