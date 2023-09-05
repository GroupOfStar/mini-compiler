import { tokenizer } from "./tokenizer";
import { parser } from "./parser";
import { transformer } from "./transformer";
import { codein } from "./codein";

export const compiler = (code: string) => {
  const tokens = tokenizer(code);
  const ast = parser(tokens);
  const transformerAST = transformer(ast);
  console.log('transformerAST :>> ', transformerAST);
  return codein(transformerAST);
};
