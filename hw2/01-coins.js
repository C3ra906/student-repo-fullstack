/** Exercise 01 - Coins **/

const calculateChange = (input) => {
  // Add your code here
  let dollar = 0;
  let quarter = 0;
  let dime = 0;
  let nickel = 0;
  let penny = 0;
  let remainder = 0;
  let new_remainder = 0;

  if (input > 10) {
    return `$${input.toFixed(2)} ==> Error: the number is too large`;
  } else if (input < 0) {
    return `$${input.toFixed(2)} ==> Error: the number is too small`;
  } else {
    if (input % 1 === 0) {
      dollar = input / 1;
      return `$${input.toFixed(2)} ==> ${dollar} dollars`;
    } else {
      //Dollar
      remainder = input % 1;
      dollar = (input - remainder) / 1;
      //console.log(`remainder after ${dollar} dollars: ${remainder}`);
      //Quarter
      new_remainder = remainder % 0.25;
      quarter = (remainder - new_remainder) / 0.25;
      remainder = new_remainder;
      //console.log(`remainder after ${quarter} quarters: ${remainder}`);
      //Dime
      new_remainder = remainder % 0.1;
      dime = (remainder - new_remainder) / 0.1;
      remainder = new_remainder;
      //console.log(`remainder after ${dime} dimes: ${remainder}`);
      //Nickel
      new_remainder = remainder % 0.05;
      nickel = (remainder - new_remainder) / 0.05;
      remainder = new_remainder;
      //console.log(`remainder after ${nickel} nickels: ${remainder}`);
      //Penny
      penny = (remainder * 100).toFixed(0);
      //penny = (remainder - new_remainder) / 0.01;
      //remainder = new_remainder;
      //console.log(`remainder after ${penny} pennies: ${remainder}`);
      return `$${input.toFixed(
        2
      )} ==> ${dollar} dollars, ${quarter} quarters, ${dime} dimes, ${nickel} nickels, ${penny} pennies`;
    }
  }
};

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large
//Extra tests
console.log(calculateChange(-1.35));
// $-1.35 ==> Error: the number is too small
console.log(calculateChange(5.0));

// $5.00 ==> 5 dollars
