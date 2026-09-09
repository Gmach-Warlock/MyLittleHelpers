function calculator(num1, num2, operator) {
  if (
    typeof num1 !== "number" ||
    typeof num2 !== "number" ||
    typeof operator !== "string"
  ) {
    console.log(`Invalid type in one of the parameters.`);
    return;
  }
  operator = operator.toLowerCase();
  if (
    operator !== "add" &&
    operator !== "subtract" &&
    operator !== "multiply" &&
    operator !== "divide" &&
    operator !== "exponent" &&
    operator !== "ln"
  ) {
    console.log(`Invalid operator type`);
    return;
  }
  const operatorMap = {
    add: () => num1 + num2,
    subtract: () => num1 - num2,
    multiply: () => num1 * num2,
    divide: () => num1 / num2,
    exponent: () => num1 ** num2,
    ln: (a) => Math.log(a),
  };
  return operatorMap[operator]();
}

console.log(calculator(5, 2, "exponent"));
