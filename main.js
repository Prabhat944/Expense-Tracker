function refreshPage(){ location.reload()};

//list from local storage
var key=Object.keys(localStorage);
var i=key.length;

while(i--){
    var list=document.createElement('li');
    var listItem=JSON.parse(localStorage.getItem(key[i]));
    var showItem = document.getElementById('item_list');
    showItem.appendChild(list);
    list.innerHTML=listItem.amount+"-"+listItem.category+"-"+listItem.discription;

  //add delete button
  var remove = document.createElement('button');
  remove.appendChild(document.createTextNode('Delete Expense'));
  remove.id=listItem.discription;
  remove.className='remove';
  list.appendChild(remove);

  //add edit dutton
  var edit = document.createElement('button');
  edit.appendChild(document.createTextNode('Edit Expense'));
  edit.id=listItem.discription;
  edit.className='edit';
  list.appendChild(edit);

}
 

//save to local storage
document.getElementById('container')
.addEventListener('submit',addExpense);

function addExpense(e){
    e.preventDefault();
   console.log('hello');
    var amount=document.getElementById('input1').value;
    var discription = document.getElementById('input2').value;
    var categoryIndex = document.getElementById('dropdown');
    var category = categoryIndex.options[categoryIndex.selectedIndex].value;

    //check if already present
    if(localStorage.getItem(discription)){
        alert("already exist");
        refreshPage();
    }

    var obj = {amount,category,discription };
    localStorage.setItem(discription,JSON.stringify(obj));
    refreshPage();
}


//Edit and Delete expense
var editList=document.getElementById('item_list');
editList.addEventListener('click', editItem);

function editItem(e){

    //delete
    if(e.target.classList.contains('remove')){
        var li=e.target.parentElement;
        editList.removeChild(li);
        localStorage.removeItem(e.target.id);
    }
     //edit
    else if(e.target.classList.contains('edit')){
        var localValue=JSON.parse(localStorage.getItem(e.target.id));
        document.getElementById('input1').value=localValue.amount;
        document.getElementById('input2').value=localValue.discription;
        document.getElementById('dropdown').value=localValue.category;
        localStorage.removeItem(e.target.id);
        
    }
}