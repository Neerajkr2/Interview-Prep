/**Given an array, move all zeros to the end while maintaining the relative order of the non-zero elements.
Example
Input:  [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
 */
let arr = [0,1,0,3,12];
function moveZero(arr){
    let ptr = 0;
    for(let i = 0; i<arr.length; i++){
        if(arr[i]!==0){
            [arr[ptr],arr[i]] = [arr[i], arr[ptr]];
            ptr++;
        }
    }
    return arr;
}
console.log(moveZero(arr));