/** Exercise 01 - Coins **/

const calculateChange = (input) => {
  let dollar = 0;
  let quarter = 0;
  let dime = 0;
  let nickel = 0;
  let penny = 0;
  let remainder = 0;
  let new_remainder = 0;
  let dollar_message = '';
  let quarter_message = '';
  let dime_message = '';
  let nickel_message = '';
  let penny_message = '';

  if (input > 10) {
    return `$${input.toFixed(2)} ==> Error: the number is too large`;
  } else if (input <= 0) {
    return `$${input.toFixed(2)} ==> Error: the number is too small`;
  } else {
    if (input % 1 === 0) {
      dollar = input / 1;
      return `$${input.toFixed(2)} ==> ${dollar} dollars`;
    } else {
      // Dollar Calculation
      remainder = input % 1;
      dollar = Math.round((input - remainder) / 1);

      // Quarter Calculation
      new_remainder = (Math.round(remainder * 100) / 100) % 0.25;
      quarter = Math.round((remainder - new_remainder) / 0.25);
      remainder = Math.round(new_remainder * 100) / 100;

      // Dime Calculation
      new_remainder = (Math.round(remainder * 100) / 100) % 0.1;
      dime = Math.round((remainder - new_remainder) / 0.1);
      remainder = Math.round(new_remainder * 100) / 100;

      // Nickel Calculation
      new_remainder = (Math.round(remainder * 100) / 100) % 0.05;
      nickel = Math.round((remainder - new_remainder) / 0.05);
      remainder = Math.round(new_remainder * 100) / 100;

      // Penny Calculation
      penny = Math.round(remainder * 100);

      // Dollar Amount Message
      if (dollar === 1) {
        dollar_message = `${dollar} dollar`;
      } else if (dollar > 1) {
        dollar_message = `${dollar} dollars`;
      }

      // Quarter Amount Message
      if (quarter === 1) {
        quarter_message = `${quarter} quarter`;
      } else if (quarter > 1) {
        quarter_message = `${quarter} quarters`;
      }

      // Adds comma before quarter amount if needed
      if (quarter_message !== '' && dollar_message !== '') {
        quarter_message = ', ' + quarter_message;
      }

      // Dime Amount Message
      if (dime === 1) {
        dime_message = `${dime} dime`;
      } else if (dime > 1) {
        dime_message = `${dime} dimes`;
      }

      // Adds comma before dime amount if needed
      if (
        dime_message !== '' &&
        (quarter_message !== '' || dollar_message !== '')
      ) {
        dime_message = ', ' + dime_message;
      }

      // Nickel Amount Message
      if (nickel === 1) {
        nickel_message = `${nickel} nickel`;
      } else if (nickel > 1) {
        nickel_message = `${nickel} nickels`;
      }

      // Adds comma before nickel amount if needed
      if (
        nickel_message !== '' &&
        (quarter_message !== '' || dollar_message !== '' || dime_message !== '')
      ) {
        nickel_message = ', ' + nickel_message;
      }

      // Penny Amount Message
      if (penny === 1) {
        penny_message = `${penny} penny`;
      } else if (penny > 1) {
        penny_message = `${penny} pennies`;
      }

      // Adds comma before penny amount if needed
      if (
        penny_message !== '' &&
        (quarter_message !== '' ||
          dollar_message !== '' ||
          dime_message !== '' ||
          nickel_message !== '')
      ) {
        penny_message = ', ' + penny_message;
      }
      return `$${input.toFixed(
        2
      )} ==> ${dollar_message}${quarter_message}${dime_message}${nickel_message}${penny_message}`;
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

// Extra Test Cases
console.log(calculateChange(-1.35));
// $-1.35 ==> Error: the number is too small
console.log(calculateChange(5.0));
// $5.00 ==> 5 dollars
console.log(calculateChange(0));
// $0.00 ==> Error: the number is too small
console.log(calculateChange(0.01));
// $0.01 ==> 1 penny
console.log(calculateChange(0.1));
// $0.10 ==> 1 dime
console.log(calculateChange(0.25));
// $0.25 ==> 1 quarter
console.log(calculateChange(0.05));
// $0.05 ==> 1 nickel
console.log(calculateChange(0.35));
// $0.35 ==> 1 quarter, 1 dime
console.log(calculateChange(0.75));
// $0.75 ==> 3 quarters
