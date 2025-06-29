// Step 1: Get saved balance from browser storage (localStorage)
let savedBalance = localStorage.getItem("balance");

// Step 2: Convert saved balance (string) to a number
let balance = parseFloat(savedBalance);

// Step 3: If conversion failed, start with 0
if (isNaN(balance)) {
  balance = 0;
}

// Step 1: Get saved transactions list from localStorage
let savedTransactions = localStorage.getItem("transactions");

// Step 2: Convert saved transactions string to array
let transactions = JSON.parse(savedTransactions);

// Step 3: If no transactions saved, start with empty array
if (!transactions) {
  transactions = [];
}

// Show balance on screen if the element exists
let balanceText = document.getElementById("balance");
if (balanceText) {
  balanceText.textContent = "৳" + balance;
}

// Save balance and transactions to localStorage
function saveData() {
  localStorage.setItem("balance", balance.toString());
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Add a new transaction and save it
function addTransaction(type, amount) {
  let time = new Date().toLocaleString();

  let newTransaction = {
    time: time,
    type: type,      // "Added" or "Withdrawn"
    amount: amount,
    balance: balance // balance after this transaction
  };

  transactions.unshift(newTransaction);
  saveData();
}

// Add Money button logic (on add.html)
let addButton = document.getElementById("addBtn");
if (addButton) {
  addButton.addEventListener("click", function() {
    let input = document.getElementById("addAmount");
    let amount = parseFloat(input.value);

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a positive number.");
      return;
    }

    balance = balance + amount;
    addTransaction("Added", amount);

    alert("Money added!");
    window.location.href = "index.html";
  });
}

// Withdraw Money button logic (on withdraw.html)
let withdrawButton = document.getElementById("withdrawBtn");
if (withdrawButton) {
  withdrawButton.addEventListener("click", function() {
    let input = document.getElementById("withdrawAmount");
    let amount = parseFloat(input.value);

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a positive number.");
      return;
    }

    if (amount > balance) {
      alert("You do not have enough money.");
      return;
    }

    balance = balance - amount;
    addTransaction("Withdrawn", amount);

    alert("Money withdrawn!");
    window.location.href = "index.html";
  });
}

// Show transaction history (on history.html)
let historyBox = document.getElementById("historyList");
if (historyBox) {
  if (transactions.length === 0) {
    let item = document.createElement("li");
    item.textContent = "No transactions yet.";
    item.className = "text-center text-gray-400";
    historyBox.appendChild(item);
  } else {
    transactions.forEach(function(t) {
      let item = document.createElement("li");
      item.textContent = t.time + " - " + t.type + " ৳" + t.amount + " (Balance: ৳" + t.balance + ")";
      if (t.type === "Added") {
        item.className = "p-2 rounded bg-green-100";
      } else {
        item.className = "p-2 rounded bg-red-100";
      }
      historyBox.appendChild(item);
    });
  }
}

// Reset button logic (optional)
let resetButton = document.getElementById("resetBtn");
if (resetButton) {
  resetButton.addEventListener("click", function() {
    let confirmReset = confirm("Reset all balance and history?");
    if (confirmReset) {
      localStorage.removeItem("balance");
      localStorage.removeItem("transactions");
      alert("All data cleared.");
      window.location.href = "index.html";
    }
  });
}
