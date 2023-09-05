export const codein = (node: any): string => {
  switch (node.type) {
    case "Program":
      return node.body.map(codein).join("");
    case "ExpressionStatement":
      return codein(node.expression) + ";";
    case "NumberLiteral":
      return node.value;
    case "CallExpression":
      return (
        node.callee.name + "(" + node.arguments.map(codein).join(", ") + ")"
      );
    default:
      return "";
  }
};
