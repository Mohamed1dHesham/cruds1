let searchDiv = document.getElementById('searchDiv');
let searchInput = document.getElementById('searchInput');
let titleDiv = document.getElementById('titleDiv');
let titleInput = document.getElementById("titleInput");
let pricesDiv = document.getElementById('pricesDiv');
let priceInput = document.getElementById("priceInput");
let taxesInput = document.getElementById("taxesInput");
let adsenseInput = document.getElementById("adsenseInput");
let discountInput = document.getElementById("discountInput");
let total = document.getElementById("total");
let calcTotal;
let countDiv = document.getElementById("countDiv");
let countInput = document.getElementById("countInput");
let catDiv = document.getElementById("catDiv");
let categoryInput = document.getElementById("categoryInput");
let massageTitleCate = document.getElementById("massageTitleCate");
let createBtn = document.getElementById("createBtn");
let deleteBtn = document.getElementById("deleteBtn");
let arrayInput; 
arrayInput=[titleInput,titleDiv,priceInput,pricesDiv,taxesInput,adsenseInput,discountInput,categoryInput,catDiv,countDiv];
// firsgroupbutton
let creater = document.getElementById("creater");
let updater = document.getElementById("updater");
let deleter = document.getElementById("deleter");
let searchr = document.getElementById("searchr");
let groupInputs=[creater,updater,deleter,searchr];
// data
let dataPro;
let newPro;
let tbody1 = document.getElementById("tbody1");
function searchClick()
{
    tbody1.innerHTML='';
    clearInput();
    groupInput(3);
    createBtn.style.display = "none";
    deleteBtn.innerHTML = "cancel";
    countnone()
    deleteBtn.onclick = () => subCan(true);
    ifPriceInput(false); 
    
}
function arrayInputDisabled(value)
{   for(let j=0; j<arrayInput.length; j++)
    value==true? arrayInput[j].disabled=true:arrayInput[j].disabled=false;
}
function clearInput() 
{   titleInput.value ='';
    priceInput.value ='';
    taxesInput.value ='';
    adsenseInput.value ='';
    discountInput.value ='';
    countInput.value ='';
    categoryInput.value ='';
    total.style.display='none';
    massageTitleCate.innerHTML = '';
    showDeleteButton()
}
function ifPriceInput( q =true ) 
{   let priceArray=[taxesInput,adsenseInput,discountInput]
    for(let i=0; i<priceArray.length; i++)
    {
    if (priceInput.value=='') 
    {
        priceArray[i].disabled=q;
        taxesInput.value="";
        adsenseInput.value="";
        discountInput.value="";
    }
    else if(priceInput!=NaN) priceArray[i].disabled=false;
    }
}
function getTotal()
{   if(priceInput.value!="")
    {
        calcTotal=(+priceInput.value + +taxesInput.value + +adsenseInput.value) - +discountInput.value;
        total.innerHTML = `Total price after: ${calcTotal}`;
        total.style.display = 'block';
        total.style.backgroundColor='#390053';
        total.style.fontSize='medium';
        total.style.width='90%';
        total.style.padding='10PX';
        total.style.marginTop='5px';
        total.style.borderRadius='5px';
    }
}
function showData(value=true,j)
{   let table='';
    function tbody2(i)
    {
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].adsense}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button style='background-color:#390058;padding:5px;border-radius:20px;' onclick='updateData(${i})'>Update</button></td>
        <td><button style='background-color:#9f0000;padding:5px;border-radius:20px;' onclick='delData1(${i})' ondblclick='delData2(${i})'>Delete</button></td>
        </tr>`;
    }
    if(value==true)
    for(let i=0 ; i<dataPro.length ; i++)
        {tbody2(i);}
    else if(value==false)
        { tbody2(j);}
    tbody1.innerHTML=table;
    tbody1.style.textAlign='center';
}
function normalFunction()  { clearInput(); showData(); ifPriceInput() }
function createBtnOnClick()
{   if(titleInput.value!='' && categoryInput.value!='' && priceInput.value!='')
    {   getTotal();
        if(priceInput.value=="")
        {   calcTotal=0;
            priceInput.value=0;
            total.style.display="none";
        }
        newPro = {
            title: titleInput.value,
            price: priceInput.value,
            taxes: taxesInput.value,
            adsense: adsenseInput.value,
            discount: discountInput.value,
            total: calcTotal,
            count: countInput.value,
            category: categoryInput.value,
        }
        if(newPro.count > 1)
        {   for(let i=0; i<newPro.count ; i++)
            {    dataPro.push(newPro); } 
        }
        else  dataPro.push(newPro);

        localStorage.setItem('product', JSON.stringify(dataPro))
        normalFunction();
        groupInput(0)
    }    
    else 
    {massageTitleCate.innerHTML = "You may not have written the title or category or price, please write them."
    massageTitleCate.style.color='red';}
}
function showDeleteButton()
{   if (localStorage.product!=null)
    {   deleteBtn.style.display='flex';
        deleteBtn.style.backgroundColor='#020d19';
        deleteBtn.style.margin='5px';
        deleteBtn.style.alignItems='center';
        deleteBtn.style.justifyContent='center';
        deleteBtn.innerHTML=`Delete all data`;
    }
    else if (localStorage.product==null)
    deleteBtn.style.display='none'
}
function deleteBtnOnClick()
{   localStorage.removeItem('product');
    dataPro=[]
    normalFunction();
    groupInput(0);
}
function countnone()
{   countDiv.style.display='none';
    countInput.value='';
}
function subCan(i)
{   localStorage.product = JSON.stringify(dataPro);   
    createBtn.innerHTML=`Create`;
    countDiv.style.display='block';
    createBtn.style.display='block';
    arrayInputDisabled(false);
    createBtn.onclick= () => {createBtnOnClick()}
    deleteBtn.onclick= () => {deleteBtnOnClick()}
    normalFunction();
    ifPriceInput();
    i==true? groupInput(0):i=false;
}
function delAndUpdateData(i)
{   subCan();
    titleInput.value=dataPro[i].title;
    priceInput.value=dataPro[i].price;
    taxesInput.value=dataPro[i].taxes;
    adsenseInput.value=dataPro[i].adsense;
    discountInput.value=dataPro[i].discount;
    countnone();
    categoryInput.value=dataPro[i].category;
    deleteBtn.innerHTML='cancel';
    getTotal();
}
function updateData(i)
{   groupInput(1);
    clearInput();
    delAndUpdateData(i);
    createBtn.innerHTML=`Update for ID : ${i+1}`;
    createBtn.onclick=()=>
    {   if(priceInput.value=="")
        {   calcTotal=0;
            priceInput.value=0;
            total.style.display="none";
        }
        if(createBtn.innerHTML!='Create')
        {   dataPro[i].title=titleInput.value;
            dataPro[i].price=priceInput.value;
            dataPro[i].taxes=taxesInput.value;
            dataPro[i].adsense=adsenseInput.value;
            dataPro[i].discount=discountInput.value;
            dataPro[i].total=calcTotal;
            dataPro[i].category=categoryInput.value;
            subCan(true);
        }
        else if(createBtn.innerHTML=='Create')
            createBtnOnClick();
    }
    deleteBtn.onclick = () => subCan(true);
    ifPriceInput()
}
//onclick 
function delData1(i)
{   groupInput(2);
    delAndUpdateData(i);
    arrayInputDisabled(true);
    createBtn.innerHTML=`Delete for ID : ${i+1}`;
    createBtn.onclick=()=>
    {   dataPro.splice(i, 1);
        subCan(true);
    }
    deleteBtn.onclick=()=> subCan(true);
}
//ondblclick
function delData2(i)
{   dataPro.splice(i, 1);
    subCan(true); 
}
function ifSearch()
{
    if(searchr.style.display=='flex')
    {
        for(let i=0; i<dataPro.length; i++)
        {
            if(dataPro[i].title.includes(titleInput.value) && dataPro[i].title.includes()!='')
            {
                showData(false,i);
            }
        }
    }
}

function groupInput(i)
{   for(let j=0; j<groupInputs.length; j++)
    {   if(i==j)
        {   groupInputs[j].style.fontSize='larger';
            groupInputs[j].style.padding='20px';
            groupInputs[j].style.position='fixed';
            groupInputs[j].style.top='45px';
            groupInputs[j].style.left='105px';
            groupInputs[j].style.width='100px';
            groupInputs[j].style.backgroundColor='#020d19';
            groupInputs[j].style.cursor='default';
            groupInputs[j].style.zIndex='1';
            groupInputs[j].style.padding='15px 10px';
            groupInputs[j].style.border='1px solid';
            groupInputs[j].style.borderColor='#1d4ad266 #1d4ad266 transparent';
            if(i==0)
            {   titleDiv.style.display='block';
                countDiv.style.display='block';
                deleter.style.display='none';
                updater.style.display='none';
                subCan();
            }
        }
        if(i!=j)
        {   i==0? creater.style.display='flex':creater.style.display='none';
            i==1? updater.style.display='flex':updater.style.display='none';
            i==2? deleter.style.display='flex':deleter.style.display='none';
            i==3? searchr.style.display='flex':searchr.style.display='none';
            groupInputs[j].style.position='unset';
            groupInputs[j].style.justifyContent='center';
            groupInputs[j].style.alignItems='center';
            groupInputs[j].style.height='25px';
            groupInputs[j].style.fontSize='16px';
            groupInputs[j].style.backgroundColor='#1d4ad266';
            groupInputs[j].style.borderRadius='4px';
            groupInputs[j].style.padding='5px';
            groupInputs[j].style.width='94%';
            groupInputs[j].style.outline='none';
            groupInputs[j].style.border='none';
            groupInputs[j].style.marginBottom='5px';
        }
    }    
}
localStorage.product!=null? dataPro=JSON.parse(localStorage.product):dataPro=[];

countInput.onkeyup=()=>
    countInput.value>=100? countInput.value=100:
    countInput.value<=-1? countInput.value=1:true;
normalFunction();
groupInput(0);

