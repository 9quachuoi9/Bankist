'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2020-07-12T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// modal
const modal = document.querySelector('.modal');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// display movement to movement element
const displayMoment = function (acc, sort = false) {
    containerMovements.innerHTML = '';

    const movs = sort
        ? acc.movements.slice().sort((a, b) => a - b)
        : acc.movements;

    movs.forEach(function (mov, i) {
        const date = new Date(acc.movementsDates[i]);
        const day = `${date.getDate()}`.padStart(2, 0);
        const month = `${date.getMonth() + 1}`.padStart(2, 0);
        const year = date.getFullYear();
        const displayDate = `${day}/${month}/${year}`;
        const type = mov >= 0 ? 'deposit' : 'withdrawal';

        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i} ${type}</div>
            <div class="movements__date">${displayDate}</div>
            <div class="movements__value">${mov.toFixed(2)}€</div>
        </div>
      `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

// calculate balance from movements & display to the website

// (movements => {
//     const balance = movements.reduce((acc, mov) => acc + mov, 0);
//     labelBalance.textContent = `${balance}€`;
// })(movements);

const calcDisplayBalance = acc => {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance}€`;
};

// Display summary income, outcome, interest
const calcDisplaySummary = acc => {
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    const out = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interestRate) / 100)
        .filter(deposit => deposit >= 1)
        .reduce((acc, mov) => acc + mov, 0);

    labelSumIn.textContent = `${incomes.toFixed(2)}€`;
    labelSumOut.textContent = `${Math.abs(out.toFixed(2))}€`;
    labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

// create userName property on each account array

const createUserName = account => {
    account.forEach(acc => {
        acc.userName = acc.owner
            .toLowerCase()
            .split(' ')
            .map(letter => letter[0])
            .join('');
    });
};

createUserName(accounts);

const dateObj = new Date();

const updateUI = acc => {
    displayMoment(acc);
    calcDisplayBalance(acc);
    calcDisplaySummary(acc);
};

let currentAccount;
let sorted;

// Event handler
btnLogin.addEventListener('click', e => {
    // prevent form from submitting
    e.preventDefault();
    // check user login
    currentAccount = accounts.find(
        acc => acc.userName === inputLoginUsername.value
    );
    // check pin user
    if (currentAccount?.pin === +inputLoginPin.value) {
        const now = new Date();
        const day = `${now.getDate()}`.padStart(2, 0);
        const month = `${now.getMonth() + 1}`.padStart(2, 0);
        const year = now.getFullYear();
        const hour = `${now.getHours()}`.padStart(2, 0);
        const minutes = `${now.getMinutes()}`.padStart(2, 0);
        labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;

        // clear form login
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        // display message
        labelWelcome.textContent = `Welcome back, ${
            currentAccount.owner.split(' ')[0]
        }`;

        // display app
        containerApp.style.display = 'grid';

        updateUI(currentAccount);
    } else alert('Wrong username or password');
    sorted = false;
});

btnTransfer.addEventListener('click', e => {
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);

    const receiveAcc = accounts.find(
        acc => acc.userName === inputTransferTo.value
    );

    if (
        amount > 0 &&
        receiveAcc &&
        currentAccount.balance >= amount &&
        currentAccount.userName !== receiveAcc.userName
    ) {
        receiveAcc.movements.push(amount);
        currentAccount.movements.push(-amount);

        currentAccount.movementsDates.push(new Date().toISOString());
        receiveAcc.movementsDates.push(new Date().toISOString());

        updateUI(currentAccount);
    }
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferTo.blur();
});

btnLoan.addEventListener('click', e => {
    e.preventDefault();

    const amount = Math.floor(inputLoanAmount.value);

    if (
        amount > 0 &&
        currentAccount.movements.some(
            mov => mov >= amount * 0.1 /* 10% of amount*/
        )
    ) {
        // add movement
        currentAccount.movements.push(amount);

        currentAccount.movementsDates.push(new Date().toISOString());

        updateUI(currentAccount);
    }

    inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
    e.preventDefault();

    if (
        currentAccount.userName === inputCloseUsername.value &&
        currentAccount.pin === Number(inputClosePin.value)
    ) {
        const index = accounts.findIndex(
            acc => acc.userName === currentAccount.userName
        );

        accounts.splice(index, 1);
        containerApp.style.display = 'none';
    }

    inputCloseUsername.value = inputClosePin.value = '';
    labelWelcome.textContent = 'Log in to get started';
});

btnSort.addEventListener('click', function (e) {
    e.preventDefault();

    displayMoment(currentAccount.movements, !sorted);
    sorted = !sorted;
});

// modal.addEventListener('click', () => {
//     modal.style.display = 'none';
// });

// document.querySelector('.modal-dialog').addEventListener('click', e => {
//     e.stopPropagation();
// });

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


// max value
const max = movements.reduce(
    (acc, mov) => (acc > mov ? acc : mov),
    movements[0]
);

// find method

const account = accounts.find(acc => acc.owner === 'An Tram Trinh');

//flatMap & flat

const totalMovement = accounts
    .flatMap(acc => acc.movements)
    .reduce((acc, total) => acc + total);

const totalMovement2 = accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((acc, total) => acc + total);

// console.log(movements);
// console.log(movements.sort((a, b) => b - a));

const arr = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 200 - 100)
);

console.log(arr);

const sortArr = function (array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] < array[j])
                [array[i], array[j]] = [array[j], array[i]];
        }
    }
    return array;
};

console.log(sortArr(arr));

labelBalance.addEventListener('click', function () {
    const movementsUI = Array.from(
        document.querySelectorAll('.movements__value'),
        el => Number(el.textContent.replace('€', ''))
    );
    console.log(movementsUI);
});
*/

const rdInt = function (max, min) {
    const rdNum = Math.floor(Math.random() * (max - min + 1) + min);
    return rdNum;
};
