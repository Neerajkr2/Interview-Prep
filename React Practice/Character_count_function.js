/**1. Problem Statement

Given a string, count the occurrence of each character.

Example
Input: "aman"

Output:
{
  a: 2,
  m: 1,
  n: 1
} */


  function charCount(str) {
  const count = {};

  for (const ch of str) {
    count[ch] = (count[ch] || 0) + 1;
  }

  return count;
}

console.log(charCount("aman"));
// { a: 2, m: 1, n: 1 }