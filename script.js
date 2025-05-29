const expanses ={}
const savings =[]
function formatCurrency(amount){
   return new Intl.NumberFormat("id-ID",{
    style:"currency",
    currency:"IDR",
   }).format(amount);
}

function addExpanse(){
    // console.log("before:",expanses);
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;
    const parsedAmount = parseInt(amount); 
    
    // Validasi inputan user, agar tidak bisa diisi angka nol atau minus
    if (!parsedAmount || parsedAmount <=0){
      alert("Plase enter a valid amount");
      return;
    }
    console.log("input user",category, amount);

    if(!expanses[category]){
        expanses[category] = []; 
    }

    expanses[category].push(parsedAmount);
    document.getElementById('amount').value ="";
    // Ini untuk membuat apabila add ditekan maka value dari amount akan kosong kembali
    // console.log("after:",expanses);
    updateExpanses();
}

function deleteExpanse(category,index){
    expanses[category].splice(index,1);

    if (expanses[category].leght === 0) {
        delete expenses[cayegory];
    }
    updateExpanses();
}

function updateExpanses() {
  const expanseList = document.getElementById('expanseList');
  expanseList.innerHTML="";
  
  let totalperCategory ={};
  let overallTotal = 0;

  for (const category in expanses) {
    expanses [category].forEach ((amount,index)=> {
      const li= document.createElement ("li");
      li.innerHTML = `<span>${category}: ${formatCurrency(amount)} </spam>`;

      const btn = document.createElement("button");
      btn.textContent = "x";
      btn.className ="delete";
      btn.onclick = () => deleteExpanse(category, index);

      li.appendChild(btn);
       //   Memasukan butten delete kedalam li
       expanseList.appendChild(li);
       //   Memasukan li kedalam expanseList
       overallTotal += amount;
       totalperCategory[category] = (totalperCategory[category] || 0) + amount;
    });
  }
  document.getElementById("overallTotal").textContent = 
    formatCurrency(overallTotal);
  
    const totalperCategoryList=document.getElementById("totalPerCategory");
    totalperCategoryList.innerHTML="";
    // Looping
    for(const category in totalperCategory) {
      const li = document.createElement("li");
      li.textContent= `${category}: ${formatCurrency(
        totalPerCategory[category]
      )}`;
      totalperCategoryList.appendChild(li);
    }
    calculateRemainingSavings();
}

function calculateRemainingSavings(){
  const totalSavings=savings.reduce((sum, amount) => sum + amount,0);
  const totalExpanses=Object.values(expanses)
  .flat().reduce((sum, amount) => sum + amount,0);

  const delta= totalSavings - totalExpanses;
  document.getElementById("remainingSavings")
  .textContent=formatCurrency(delta);
}

function addSavings(){
  // console.log("before", savings);
  const amount= document.getElementById("savingsAmount").value;
   const parsedAmount = parseInt(amount); 

  // Validasi inputan user, agar tidak bisa diisi angka nol atau minus
   if (!parsedAmount || parsedAmount <=0){
      alert("Plase enter a valid amount");
      return;
    }

  savings.push(parsedAmount);
  document.getElementById("savingsAmount").value = "";
  // console.log("after", savings);
  updateSavings();
}

function updateSavings() {
  const savingList= document.getElementById("savingsList");
  savingList.innerHTML = "";

  const totalSavings = savings.reduce ((sum, amount) => sum + amount,0);

  savings.forEach((amount, index)=>{
    const li= document.createElement('li');
    li.innerHTML = `<span>${formatCurrency(amount)}</span>`;

    const btn=document.createElement("button");
    btn.textContent="x";
    btn.className="delete";
    btn.onclick=() => deleteSavings(index);

    li.appendChild(btn);
    savingList.appendChild(li);
  });

  document.getElementById("totalSavings").textContent=
    formatCurrency(totalSavings);

   calculateRemainingSavings(); 
}

function deleteSavings(index){
  savings.splice(index,1);
  updateSavings();
}

function calculateRepayment(){
  const totalDebt=document.getElementById("totalDebt").value;
  const monthlyPayment=document.getElementById("mothlyPayment").value;

  const parsedTotalDebt= parseInt(totalDebt);
  const parsedMonthlyPayment=parseInt(monthlyPayment);

  // validasi inputan user, agar tidak bisa diisi angka nol atau minus
   if (!parsedTotalDebt || 
       !parsedMonthlyPayment ||
        parsedTotalDebt <=0 ||
        parsedMonthlyPayment <=0) {
      alert("Plase enter a valid amount");
      return;
    }

  const result= Math.ceil(parsedTotalDebt / parsedMonthlyPayment); 
  document.getElementById("repaymentMonth").textContent=result; 
}