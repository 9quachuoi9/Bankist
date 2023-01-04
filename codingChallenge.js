'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const account5 = {
    owner: 'An Tram Trinh',
    movements: [430, 1000, 700, 50, 90, 3000, -200],
    interestRate: 2,
    pin: 2808,
};

const accounts = [account1, account2, account3, account4, account5];

const sumDeposit = accounts
    .flatMap(mov => mov.movements)
    .reduce((acc, mov) => acc + mov);
// console.log(sumDeposit);

const numDeposit1000 = accounts
    .flatMap(mov => mov.movements)
    .filter(mov => mov >= 1000).length;
// console.log(numDeposit1000);

// const { deposit, withDrawal } = accounts
//     .flatMap(mov => mov.movements)
//     .reduce(
//         (sum, cur) => {
//             cur > 0 ? (sum.deposit += cur) : (sum.withDrawal += cur);
//             return sum;
//         },
//         { deposit: 0, withDrawal: 0 }
//     );

const { deposit, withDrawal } = accounts
    .flatMap(mov => mov.movements)
    .reduce(
        (sum, cur) => {
            sum[cur > 0 ? 'deposit' : 'withDrawal'] += cur;
            return sum;
        },
        {
            deposit: 0,
            withDrawal: 0,
        }
    );

// console.log(deposit, withDrawal);

const convertTitleCase = function (title) {
    const capitalize = str => str[0].toUpperCase() + str.slice(1);
    const exception = ['a', 'an', 'and', 'the', 'but', 'or', 'is'];

    const titleCase = title
        .toLowerCase()
        .split(' ')
        .map(word => (exception.includes(word) ? word : capitalize(word)))
        .join(' ');
    return capitalize(titleCase);
};

console.log(convertTitleCase('This is a NiCE title'));
console.log(convertTitleCase('THIS is a NiCE TITLE'));
console.log(convertTitleCase('and This is a NiCE title'));
/*
// map ,filter & reduce method
const euroToUSD = 1.1;
const movementsUSD = movements.map(mov => mov * euroToUSD);

const movementsDesc = movements.map(
    (mov, i) =>
        `Movement ${i + 1}: You ${
            mov >= 0 ? 'Deposit' : 'Withdrawal'
        } ${Math.abs(mov)}`
);

const movementsDeposit = movements.filter(mov => mov > 0);
const movementsWithdrawal = movements.filter(mov => mov < 0);
// console.log(movementsDeposit);
// console.log(movementsWithdrawal);

const balance = movements.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
);

// console.log(balance);

// max value
const max = movements.reduce(
    (acc, mov) => (acc > mov ? acc : mov),
    movements[0]
);
*/
// ------------------------Coding Challenge # 1

/* Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old */

/* Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)

2. Create an array with both Julia's (corrected) and Kate's data

3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
🐶 ")

4. Run the function for both test datasets */
const checkDogs = (dogsJulia, dogsKate) => {
    const dogsJuliaCorrected = dogsJulia.slice();
    dogsJuliaCorrected.splice(0, 1);
    dogsJuliaCorrected.splice(-2);

    const dogs = dogsJuliaCorrected.concat(dogsKate);
    dogs.forEach((dog, i) => {
        if (dog >= 3) {
            console.log(
                `Dog number ${i + 1} is an adult 🐕, and is ${dog} years old`
            );
        } else {
            console.log(`Dog number ${i + 1} is a puppy 🐶`);
        }
    });
};

// console.log('Data 1');
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// console.log('Data 2');
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
/* Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]*/

// -----------------------Coding Challenge 2
/* Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4] */

const calcAverageHumanAge = ages => {
    const humanAges = ages.map(dogAge =>
        dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
    );
    const adults = humanAges.filter(age => age >= 18);
    const humanAverageAge = adults.reduce(
        (acc, age, i, arr) => acc + age / arr.length,
        0
    );
    return humanAverageAge;
};

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

const calcAverageHumanAge2 = ages => {
    const humanAverageAge = ages
        .map(age => (age <= 2 ? 2 * age : 16 + age * 3))
        .filter(age => age >= 18)
        .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
    return humanAverageAge;
};
// console.log('Coding challenge 3');
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
