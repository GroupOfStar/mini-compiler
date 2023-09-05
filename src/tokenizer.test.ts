import { describe, expect, it } from "vitest";
import { TokenTypes, tokenizer } from "./tokenizer";

describe("happy path", () => {
  it("left paren", () => {
    const code = "(";
    expect(tokenizer(code)).toEqual([{ type: TokenTypes.Paren, value: "(" }]);
  });

  it("right paren", () => {
    const code = ")";
    expect(tokenizer(code)).toEqual([{ type: TokenTypes.Paren, value: ")" }]);
  });

  it("add", () => {
    const code = "add";
    expect(tokenizer(code)).toEqual([{ type: TokenTypes.Name, value: "add" }]);
  });

  it("number", () => {
    const code = "22";
    expect(tokenizer(code)).toEqual([{ type: TokenTypes.Number, value: "22" }]);
  });

  it("(add 1 2) should pass", () => {
    const tokens = [
      { type: TokenTypes.Paren, value: "(" },
      { type: TokenTypes.Name, value: "add" },
      { type: TokenTypes.Number, value: "1" },
      { type: TokenTypes.Number, value: "2" },
      { type: TokenTypes.Paren, value: ")" }
    ];
    expect(tokenizer("(add 1 2)")).toEqual(tokens);
  });
});
