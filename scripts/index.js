let categories = JSON.parse(localStorage.getItem('categories'));
if(!categories){
  categories = [];
}

let expense = JSON.parse(localStorage.getItem('expense'));
if(!expense){
  expense = [];
}


renderTable();
renderDropDown();
updateTotalSpend();


let spentAmonut ='';
document.getElementById('addCategoryButton').addEventListener('click',()=>{
    if(document.querySelector('.categoryInput').value === ''){
      alert("Type the Category First")
    }else{
        categories.push(document.querySelector('.categoryInput').value);

        console.log(categories);
        saveToStorageCategories();
        renderDropDown();
        document.querySelector('.categoryInput').value = '';
          }
  }
  )

  document.getElementById('addExpense').addEventListener('click',()=>{
    if(
      document.getElementById('dropdown').value==='' ||
      document.querySelector('.inputDetail').value==='' ||
      isNaN(parseFloat(document.querySelector('.inputAmount').value)) ||
      parseFloat(document.querySelector('.inputAmount').value) < 0
    ){
      alert('Please Select and Type appropriate fields')
    }else{
       expense.push({
      category: document.getElementById('dropdown').value,
      detail: document.querySelector('.inputDetail').value,
      amount: parseFloat(document.querySelector('.inputAmount').value),
      });
      saveToStorageExpense();
      updateTotalSpend();
      console.log(expense);
      renderTable();
    
    document.querySelector('.inputDetail').value='';
    document.querySelector('.inputAmount').value='';
    document.getElementById('dropdown').value='';
    }
    }
  )

function renderDropDown(){

   const dropdownv = document.getElementById('dropdown');
   dropdownv.innerHTML = '<option disabled selected>Select a Category</option>';
   categories.forEach((category) => {
    dropdownv.innerHTML += `<option value='${category}'>${category}</option>`;
  })
}

function renderTable(){

  const table = document.getElementById('tableJs');
  table.innerHTML =`<tr id="trJS">
                        <th>Category</th>
                        <th>Details</th>
                        <th>Amount($)</th>
                      </tr>`;
  expense.forEach((expenseObject)=>
    table.innerHTML +=`<tr>
                        <td>${expenseObject.category}</td>
                        <td>${expenseObject.detail}</td>
                        <td>$${expenseObject.amount}</td>
                      </tr>`
  )

};

function updateTotalSpend(){
  let total = 0

  expense.forEach((exp1)=>
   total += exp1.amount
  );
  document.querySelector('.totalSpend').innerHTML = `$${total}`

}

function saveToStorageCategories(){
  localStorage.setItem('categories',JSON.stringify(categories))
}

function saveToStorageExpense(){
  localStorage.setItem('expense',JSON.stringify(expense))
}