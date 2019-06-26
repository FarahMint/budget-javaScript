class UI {
    constructor() {
      this.budgetFeedback = document.querySelector(".budget-feedback");
      this.expenseFeedback = document.querySelector(".expense-feedback");

      this.budgetForm =  document.querySelector(".budget-form");

      this.budgetInput = document.querySelector(".budget-input");

      this.budgetAmount = document.querySelector("#budget-amount");

      this.expenseAmount = document.querySelector("#expense-amount");

      this.balance = document.querySelector(".balance");

      this.balanceAmount = document.querySelector("#balance-amount");

      this.expenseForm = document.querySelector("#expense-form");

      this.expenseInput = document.querySelector("#expense-input");

      this.amountInput = document.getElementById("amount-input");

      this.expenseList = document.querySelector(".expense-list");
      this.itemList = [];
      this.itemID = 0;
    }

    //  submit budget method
  submitBudgetForm(){
    console.log('submit form');
    console.log(this.budgetFeedback);
  
    const value=  this.budgetInput.value;
        if(value ==='' || value < 0){
            this.budgetFeedback.classList.add("showItem");
            this.budgetFeedback.innerHTML =`<p>cannot be empty or negative</p>`;

            setTimeout(()=>this.budgetFeedback.classList.remove("showItem"),2000);
        }else{
            this.budgetAmount.textContent= value;
            this.budgetInput.value= "";
            this.showBalance()
        }
    }

    // showBalance()
    showBalance(){
        // console.log('show balance');
        const expense = this.totalExpense();
        // grab value passed in the budget
        const total = parseInt(this.budgetAmount.textContent) - expense;
        this.balanceAmount.textContent= total;
        if(total <0){
            this.balance.classList.remove('showGreen', 'showBlack');
            this.balance.classList.add('showRed' );
        }
        else if(total >0){
            this.balance.classList.remove('showRed', 'showBlack');
            this.balance.classList.add( 'showGreen');
        }
        else if(total >0){
            this.balance.classList.remove('showRed', 'showGreen');
            this.balance.classList.add('showBlack' );
        }
    }

        // submitExpenseForm
        submitExpenseForm(){
                const expenseValue = this.expenseInput.value;
                const amountValue= this.amountInput.value;

                if( expenseValue=== '' ||  amountValue===''||   amountValue< 0){
                    this.expenseFeedback.classList.add('showItem');
                    this.expenseFeedback.innerHTML =`<p>cannot be empty or negative</p>`;
                    
                    setTimeout(()=>  this.expenseFeedback.classList.remove('showItem'), 3000);
                }else{
                    let amount = parseInt(amountValue);
                    // input tag -- get value
                    this.expenseInput.value='';
                    this.amountInput.value='';
                //  create object 
                let expense= {
                    id:this.itemID,
                   title: expenseValue,
                   amount,
                }
// to have unique ID
                this.itemID++;
              this.itemList.push(expense);
              this.addExpense(expense);
        //    show balance
        this.showBalance();

                }
        }

// this.addExpense(expense);
    addExpense(expense){
        
        const div = document.createElement('div');
        div.classList.add('expense');
        div.innerHTML =`
        <div class="expense-item">
                       <h6 class="expense-title list-item">${expense.title}</h6>
                       <h5 class="expense-amount list-item">${expense.amount}</h5>
                       <div class="expense-icons list-item">
                        <a href="#" class="edit-icon" data-id="${expense.id}">
                         <i class="fas fa-edit"></i>
                        </a>
                        <a href="#" class="delete-icon" data-id="${expense.id}">
                         <i class="fas fa-trash"></i>
                        </a>
                       </div>
                      </div>
                     </div>
        `
        ;


        // append to expense list 
        this.expenseList.appendChild(div);
    }

    // totalExpense()
    totalExpense(){
        // console.log('total expense');
        // calculate evrything we have in our list
        let total = 0;
        if(this.itemList.length> 0){
        //  console.log(this.itemList)
        total = this.itemList.reduce((accumulator, currentvalue)=>{
            accumulator +=  currentvalue.amount;
            return accumulator ;
        }, 0)
        }
        this.expenseAmount.textContent= total;
        return total;
    }
    // edit expense
    editExpense(element){
        // use data set to get access to id
        // console.log(element);
        // console.log(element.dataset);
        let id = parseInt(element.dataset.id);

        let parent = element.parentElement.parentElement.parentElement;
        // console.log(parent);
        // remove from dom
        this.expenseList.removeChild(parent);
        // remove from the array
        let expense = this.itemList.filter(item => item.id === id);
        
        // show value
        this.expenseInput.value= expense[0].title;
        console.log(expense[0].title);
        this.amountInput.value= expense[0].amount;
        console.log(expense[0].amount);

        // remove from list ...all items that don't have the id 
        let tempList = this.itemList.filter(item => item.id !== id);
        this.itemList= tempList;
        // showbalance
        this.showBalance();

    };           
      
    
    // delete expense
    deleteExpense(element){
        // use data set to get access to id
     console.log(element);
        // console.log(element.dataset);
        let id = parseInt(element.dataset.id);
        // traverse the dome toget the dom
        let parent = element.parentElement.parentElement.parentElement;
        // console.log(parent);
        // remove from dom
        this.expenseList.removeChild(parent); 

        // remove from list
        let tempList = this.itemList.filter(item => item.id !== id);
        this.itemList= tempList;
        // showbalance
        this.showBalance();
    }; 

  }

//   event listener when DOM load
function eventListeners(){
    const budgetForm = document.querySelector(".budget-form");
    const expenseForm = document.querySelector(".expense-form");
    const expenseList = document.querySelector(".expense-list");

    // create a new instance of the UI class
    const ui = new UI();

    // budget form submit
    budgetForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        ui.submitBudgetForm()
    });
    // expenseForm form submit
    expenseForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        ui.submitExpenseForm()
    });
    // expense list - click for crud op (delete edit)
    expenseList.addEventListener('click', (e)=>{
    console.log(e.target);
 let editIcon = e.target.parentElement.classList.contains('edit-icon');
 let deleteIcon = e.target.parentElement.classList.contains('delete-icon');
         if( editIcon){
            //  get back the link
            ui.editExpense(e.target.parentElement);           
        }else if(deleteIcon){
            // console.log(e.target);
            // console.log(e.target.parentElement);
            ui.deleteExpense(e.target.parentElement);             
         }
    });
}

document.addEventListener("DOMContentLoaded", ()=>{ 
    eventListeners();
})