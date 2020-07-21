const fs = require('fs');
const before = JSON.parse(fs.readFileSync('iso_3166-1.json'));
// console.log(before);
let after = {}

for (const item of before) {
  console.log(item.alpha2);
  after[item.alpha2] = item;
  delete after[item.alpha2].alpha2;
}

fs.writeFileSync('country_code.json',JSON.stringify(after));
console.log(after);