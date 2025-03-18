const labelDeposit = document.querySelector('.label_display--deposit');
const labelWithdrawn = document.querySelector('.label_display--withdrawal');
const labelInterest = document.querySelector('.label_display--interest');
const movementContainer = document.querySelector('.movement-container');

const movements = [200, 1300, -1300, 600, 500, -1000, 3000, -500, -450];
const displayMovements = movements => {
  movements.map((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movement">
        <p class=${type}><span>${i + 1}</span> ${type}</p>
        <p class='text-style'>$${Math.abs(mov)}</p>
      </div>`;

    movementContainer.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(movements);

const displaySummary = movements => {
  const deposit = movements
    .filter(mov => mov > 0)
    .reduce((acc, curDep) => acc + curDep);
  labelDeposit.textContent = `DEPOSIT: $${deposit}`;

  const withdrawal = movements
    .filter(mov => mov < 0)
    .reduce((acc, curWith) => acc + curWith);
  labelWithdrawn.textContent = `WITHDRAWAL: $${Math.abs(withdrawal)}`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(mov => Math.trunc((mov * 1.1) / 100))
    .reduce((acc, currInterest) => acc + currInterest);
  console.log(interest);
  labelInterest.textContent = `INTEREST: $${Math.abs(interest)}`;
};

displaySummary(movements);

const marqueeText = document.querySelector('.marquee-text');

const marText = `Claim your Offer Today! `;
marqueeText.textContent = marText.repeat(8);

// const changingText = document.querySelector('.changing-text');

// let intervalId = setInterval(() => {
//   const minutes = new Date().getMinutes();
//   const seconds = new Date().getSeconds();
//   let hours = new Date().getHours();
//   let ampm = hours <= 12 ? 'AM' : 'PM';
//   hours = hours % 12 || 12;
//   changingText.textContent = `The time is : ${hours}:${minutes}:${seconds}${ampm}`;
// }, 1000);

const changingText = document.querySelector('.time');

const updateTime = () => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, '0');
  let seconds = now.getSeconds().toString().padStart(2, '0');
  let ampm = hours < 12 ? 'AM' : 'PM';

  hours = hours % 12 || 12;

  (hours < 9 && ampm === 'AM') || (hours > 5 && ampm === 'PM')
    ? (changingText.textContent = `The bank is closed`)
    : (changingText.textContent = `The time is: ${hours}:${minutes}:${seconds} ${ampm}`);
};

// Initial call to prevent 1-second delay
updateTime();

// Update every second
const intervalId = setInterval(updateTime, 1000);
