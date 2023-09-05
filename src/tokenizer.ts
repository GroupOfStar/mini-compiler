export enum TokenTypes {
  Paren,
  Name,
  Number,
  String
}

export interface Token {
  type: TokenTypes;
  value: string;
}

/**
 *
 * (add 2 (subtract 4 2))    add(2, subtract(4, 2))
 *
 * 解析(词法分析、语法分析)， 转换， 代码编译
 *   [
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'add'      },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'subtract' },
 *     { type: 'number', value: '4'        },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: ')'        },
 *     { type: 'paren',  value: ')'        },
 *   ] *
 *  */

export const tokenizer = (input: string): Token[] => {
  let current = 0;
  const tokens: Token[] = [];
  while (current < input.length) {
    let char = input[current];
    if (char === "(") {
      tokens.push({ type: TokenTypes.Paren, value: char });
      current++;
      continue;
    }
    const LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";
      while (LETTERS.test(char) && current < input.length) {
        value = value + char;
        current++;
        char = input[current];
      }
      tokens.push({ type: TokenTypes.Name, value });
    }

    const WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    const NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = "";
      while (NUMBERS.test(char)) {
        value += char;
        current++;
        char = input[current];
        continue;
      }
      tokens.push({ type: TokenTypes.Number, value });
      continue;
    }

    if (char === ")") {
      tokens.push({ type: TokenTypes.Paren, value: char });
      current++;
      continue;
    }
  }
  return tokens;
};
