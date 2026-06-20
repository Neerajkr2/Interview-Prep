/**Problem Statement
Given an array of size n containing distinct numbers from 0 to n, find the missing number.
Example
Input:  [3, 0, 1]
Output: 2
Because the numbers should be:
0, 1, 2, 3
and 2 is missing.
 */

let inp = [3,0,1];

function missNum(inp){
    const n = inp.length;
    const expSum = (n*(n+1))/2;
    let currSum = 0;
    for(let i = 0; i<n; i++){
        currSum += inp[i];
    }
    return expSum - currSum;
}
console.log(missNum(inp))