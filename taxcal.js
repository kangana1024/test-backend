/* eslint-disable @typescript-eslint/no-use-before-define */
let inputTax = 5000002;

const taxSum = [];
const overFlow = { min: 150000, max: 5000001 };
const taxlimit = [
  { id: 1, min: 150001, max: 300000, tax: 0.05 },
  { id: 2, min: 300001, max: 500000, tax: 0.1 },
  { id: 3, min: 500001, max: 750000, tax: 0.15 },
  { id: 4, min: 750001, max: 1000000, tax: 0.2 },
  { id: 5, min: 1000001, max: 2000000, tax: 0.25 },
  { id: 6, min: 2000001, max: 5000000, tax: 0.3 },
];

if (inputTax < overFlow.min) {
  // when net < overFlow.min(150,000)
  taxSum.push(0);
} else {
  // when net > overFlow.min(150,000)
  if (inputTax >= overFlow.max) {
    // when net > overFlow.max(5,000,000)
    taxSum.push(calTax(overFlow.max, inputTax, 0.35));
    inputTax = overFlow.max - 1;
  }

  const findLimit = findIndexBetween(inputTax);
  taxSum.push(calTax(findLimit.min, inputTax, findLimit.tax));
  inputTax = inputTax - findLimit.max;

  const oSum = taxlimit.filter(oLimit => {
    return oLimit.id < findLimit.id;
  });

  oSum.forEach(sumItem => {
    taxSum.push(calTax(sumItem.min, sumItem.max, sumItem.tax));
    inputTax = inputTax - sumItem.max;
  });
}

console.log('Tax Sum : ', taxSum.reduce(sumTax, 0));

function findIndexBetween(num) {
  const limitIndex = taxlimit.find(tax => {
    return num <= tax.max && num >= tax.min;
  });

  return limitIndex;
}

function calTax(min, max, tax) {
  return (max - (min - 1)) * tax;
}

function sumTax(accumulator, currentValue) {
  return accumulator + currentValue;
}
