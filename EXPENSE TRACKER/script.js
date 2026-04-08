if(localStorage.getItem("isLoggedIn") !== "true"){
  window.location.href = "login.html";
}
let transactions = [
  {
    id: 1,
    date: "2025-01-14",
    amount: - 440,
    status: "Success",
    type: "expense",
  },

  {
    id: 1,
    date: "2025-01-10",
    amount: - 440,
    status: "Success",
    type: "expense",
  },

  {
    id: 1,
    date: "2025-01-8",
    amount: - 440,
    status: "Success",
    type: "expense",
  },
];

let monthlyIncome = 2645;
let monthlyExpenses = 1895;

const today = new Date().toISOString().split('T')[0]
document.getElementById('incomeDate').value = today
document.getElementById('expenseDate').value = today

function openIncomeModel() {
  document.getElementById('incomeModel').style.display = 'block'
  document.body.style.overflow = 'hidden'
}

function openExpenseModel() {
  document.getElementById('expenseModel').style.display = 'block'
  document.body.style.overflow = 'hidden'
}

function closeModel(modalId) {
  document.getElementById(modalId).style.display = 'none'
  document.body.style.overflow = 'auto'

  if (modalId === 'incomeModel') {
    document.getElementById('incomeForm').reset()
    document.getElementById('incomeDate').value = today

  } else {
    document.getElementById('expenseForm').reset()
    document.getElementById('expenseDate').value = today

  }
}

window.onclick = function (event) {
  const incomeModal = document.getElementById('incomeModel')
  const expenseModal = document.getElementById('expenseModel')

  if (event.target === incomeModal) {
    closeModel('incomeModel')
  }

  if (event.target === expenseModal) {
    closeModel('expenseModel')
  }
}

function addIncome() {
  const amount = parseFloat(document.getElementById('incomeAmount').value)
  const category = document.getElementById('incomeCategory').value
  const description = document.getElementById('incomeDescription').value
  const date = document.getElementById('incomeDate').value

  if (!amount || !category || !date) {
    alert('Please fill in all required fields')
    return
  }

  const newTranasction = {
    id: transactions.length + 1,
    date: date,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    amount: amount,
    status: 'Success',
    type: 'income',
    description: description,
  }

  transactions.unshift(newTranasction)

  monthlyIncome += amount
  updateDashboard()
  updateTransactionsTable()

  closeModel('incomeModel');
  showNotification("Income added sucessfully", "success");
}

function addExpense() {
  const amount = parseFloat(document.getElementById('expenseAmount').value)
  const category = document.getElementById('expenseCategory').value
  const description = document.getElementById('expenseDescription').value
  const date = document.getElementById('expenseDate').value

  if (!amount || !category || !date) {
    alert('Please fill in all required fields')
    return
  }

  const newTranasction = {
    id: transactions.length + 1,
    date: date,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    amount: -amount,
    status: 'Success',
    type: 'expense',
    description: description,
  }

  transactions.unshift(newTranasction)

  monthlyExpenses += amount
  updateDashboard()
  updateTransactionsTable()

  closeModel('expenseModel');
  showNotification("Expense added sucessfully", "success");
}

function updateDashboard() {
  document.querySelector('.income-amount').textContent = `${monthlyIncome.toLocaleString()}.00`
  document.querySelector('.expense-amount').textContent = `${monthlyExpenses.toLocaleString()}.00`

  let spendingLimit = 12645
  const usedAmount = monthlyExpenses
  const percentage = (usedAmount / spendingLimit) * 100
  document.querySelector('.spending-limit').textContent = `${(spendingLimit - usedAmount).toLocaleString()}.00`
  document.querySelector('.progress-fill').style.width = `${Math.min(percentage, 100)}%`

}

function updateTransactionsTable() {
  const tbody = document.querySelector('.transactions-table tbody')
  tbody.innerHTML = ''

  const recentTransactions = transactions.slice(0, 10)

  recentTransactions.forEach((transactions) => {
    const row = document.createElement('tr');
    const formattedDate = new Date(transactions.date).toLocaleDateString(
      'en-Us', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }
    )

    const amountDisplay = transactions.amount > 0 ? `+${transactions.amount.toLocaleString()}.00` : `-${Math.abs(transactions.amount).toLocaleString()}.00`

    row.innerHTML = `
      <td>${formattedDate}</td>
      <td>${transactions.category}</td>
      <td style="color: ${transactions.amount > 0 ? '#10b981' : '#ef4444'}">${amountDisplay}</td>
      <td><span class="status-success">${transactions.status}</span></td>
      <td><button class="action-bth"><i class="fas fa-ellipsis"></i></button></td>
    `;
    tbody.appendChild(row)
  })
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div')
  notification.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1001;
    animation: slideInRight 0.3s ease;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
  `
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease'
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300);
  }, 3000);
}

const style = document.createElement('style');
style.textContent = `
 @keyframes slideInRight{
  from{transform: translateX(100%); 
    opacity: 0;}
    to{
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight{
    from{transform: translateX(0); 
      opacity: 1;}
      to{
        transform: translateX(100%);
        opacity: 0;
      }
  }
`
document.head.appendChild(style)

function loadUserData() {
  const user = localStorage.getItem("loggedInUser")
  if (user) {
    const welcomeText = document.getElementById("welcomeText")
    if (welcomeText) {
      welcomeText.innerText = `${getGreeting()}, ${user}`
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  loadUserData()
  updateDashboard()
  updateTransactionsTable()
})

function logoutUser() {
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("loggedInUser")
  window.location.href = "login.html"
}



