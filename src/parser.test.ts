import { describe, expect, it } from "vitest";
import { TokenTypes } from "./tokenizer";
import { NodeTypes, RootNode } from "./ast";
import { parser } from "./parser";

describe("happy path", () => {
  it("name", () => {
    const tokens = [{ type: TokenTypes.Name, value: "hello" }];
    const ast = {
      type: NodeTypes.Program,
      body: [{ type: NodeTypes.CallExpression, name: "hello", params: [] }]
    };
    expect(parser(tokens)).toEqual(ast);
  });

  it("number", () => {
    const tokens = [{ type: TokenTypes.Number, value: "22" }];
    const ast = {
      type: NodeTypes.Program,
      body: [{ type: NodeTypes.NumberLiteral, value: "22" }]
    };
    expect(parser(tokens)).toEqual(ast);
  });

  it("should add(1, 2) is OK", () => {
    const tokens = [
      { type: TokenTypes.Paren, value: "(" },
      { type: TokenTypes.Name, value: "add" },
      { type: TokenTypes.Number, value: "1" },
      { type: TokenTypes.Number, value: "2" },
      { type: TokenTypes.Paren, value: ")" }
    ];

    const ast = {
      type: NodeTypes.Program,
      body: [
        {
          type: NodeTypes.CallExpression,
          name: "add",
          params: [
            { type: NodeTypes.NumberLiteral, value: "1" },
            { type: NodeTypes.NumberLiteral, value: "2" }
          ]
        }
      ]
    };
    expect(parser(tokens)).toEqual(ast);
  });

  it("parser tokens to ast", () => {
    // (add 2 (subtract 4 2))
    const tokens = [
      { type: TokenTypes.Paren, value: "(" },
      { type: TokenTypes.Name, value: "add" },
      { type: TokenTypes.Number, value: "2" },
      { type: TokenTypes.Paren, value: "(" },
      { type: TokenTypes.Name, value: "subtract" },
      { type: TokenTypes.Number, value: "4" },
      { type: TokenTypes.Number, value: "2" },
      { type: TokenTypes.Paren, value: ")" },
      { type: TokenTypes.Paren, value: ")" }
    ];

    const ast: RootNode = {
      type: NodeTypes.Program,
      body: [
        {
          type: NodeTypes.CallExpression,
          name: "add",
          params: [
            { type: NodeTypes.NumberLiteral, value: "2" },
            {
              type: NodeTypes.CallExpression,
              name: "subtract",
              params: [
                { type: NodeTypes.NumberLiteral, value: "4" },
                { type: NodeTypes.NumberLiteral, value: "2" }
              ]
            }
          ]
        }
      ]
    };
    expect(parser(tokens)).toEqual(ast);
  });
});
