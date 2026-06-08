document.addEventListener('DOMContentLoaded', ()=>{

    const expenseForm = document.getElementById("expense-form")
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    //expense array
    let expenses = JSON.parse(localStorage.getItem('expenses')) || []

    let totalAmount = calculateTotal()
    renderExpenses()

    //when form submit
    expenseForm.addEventListener('submit', (e)=>{

        //browser manually reload the page so it prevent that
        e.preventDefault()

        //get name and value
        const name = expenseNameInput.value.trim()
        const amount = parseFloat(expenseAmountInput.value.trim())

        //if user gives empty name, value
        if(name !== "" && !isNaN(amount) && amount>0){

            const newExpense = {
                id: Date.now(),
                name,
                amount
            }

            //push to expense array
            expenses.push(newExpense)
            saveExpensesToLocal()
            renderExpenses()
            updateTotal()

            //clear the input
            expenseNameInput.value = ""
            expenseAmountInput.value = ""

        }
    })

    function renderExpenses(){
        expenseList.innerHTML = ""
        expenses.forEach((expense, index) =>{
           const li = document.createElement('li')

           li.innerHTML = `
           ${expense.name} - $${expense.amount}
           <button class ="delete-btn" data-index="${index}">Delete</button>
           
           `

           expenseList.appendChild(li)
        })
    }

    function updateTotal(){
        totalAmount = calculateTotal()
        totalAmountDisplay.textContent = totalAmount.toFixed(2)
    }


    function calculateTotal(){
        return expenses.reduce((sum, expense)=>sum+expense.amount, 0)

    }

    //save to local storage
    function saveExpensesToLocal(){
        localStorage.setItem("expenses", JSON.stringify(expenses))
    }

    //handle the remove btn
    expenseList.addEventListener('click' ,(e) =>{
        if(e.target.classList.contains("delete-btn")){
            const index = parseInt(e.target.dataset.index)
            expenses.splice(index, 1)
            localStorage.setItem("expenses", JSON.stringify(expenses));

            saveExpensesToLocal()
            renderExpenses()
            updateTotal()
        }
    })
})