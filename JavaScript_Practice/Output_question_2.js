console.log("A");
Promise.resolve().then(() => {
    console.log("B");
});
setTimeout(() => {
    console.log("C");
}, 0);
console.log("D");