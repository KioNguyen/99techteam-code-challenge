//  Iterative Approach //
function sumToNIterative(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

//Mathematical Formula Approach//
function sumToNFormula(n) {
  return (n * (n + 1)) / 2;
}

// Recursive Approach //
function sumToNRecursive(n) {
  if (n === 0) return 0;
  return n + sumToNRecursive(n - 1);
}

// Test the implementations
console.log(sumToNIterative(5)); // Output: 15
console.log(sumToNFormula(5)); // Output: 15
console.log(sumToNRecursive(5)); // Output: 15
