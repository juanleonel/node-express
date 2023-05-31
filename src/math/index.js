const now = new Date();
function sumFromOneTo(n) {
  let sum = 0;
  for (let index = 0; index <= n; index++) {
    sum += index;
  }

  return sum;
}
let total = sumFromOneTo(10000);
const end = new Date();

console.log(total);
console.log(now, end)

