# Sum to N Implementations

This project provides three different implementations to calculate the sum of integers from 1 to N in JavaScript.

## Iterative Approach

The iterative approach uses a for loop to accumulate the sum.

```javascript
function sumToNIterative(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
```

## Mathematical Formula Approach

This approach uses the mathematical formula to compute the sum directly.

```javascript
function sumToNFormula(n) {
    return (n * (n + 1)) / 2;
}
```

## Recursive Approach

The recursive approach calculates the sum by recursively adding the current number to the sum of the previous numbers.

```javascript
function sumToNRecursive(n) {
    if (n === 0) return 0;
    return n + sumToNRecursive(n - 1);
}
```

## Complexity Summary

| Approach             | Time Complexity | Space Complexity |  Note                             |
|----------------------|------------------|-------------------|--------------------------------|
| Iterative            | O(n)             | O(1)              | Simple and memory-efficient    |
| Mathematical Formula | O(1)             | O(1)              | Fastest and most efficient     |
| Recursive            | O(n)             | O(n)              | Elegant but uses stack memory  |