let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const currency = {
  'PENNY': 0.01,
  'NICKEL': 0.05,
  'DIME': 0.1,
  'QUARTER': 0.25,
  'ONE': 1,
  'FIVE': 5,
  'TEN': 10,
  'TWENTY': 20,
  'ONE HUNDRED': 100,
};

const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const changeInDrawer = document.getElementById("change-in-drawer");
const itemPrice = document.getElementById("item-price");

const fixFloatingPointErr = (val) => parseFloat(val.toFixed(2));

const checkCidBalance = () => {
  return cid.every((val) => val[1] === 0);
}

//item price
itemPrice.textContent = `$${price}`;
//change in drawer
changeInDrawer.innerHTML = "<legend>Change in drawer</legend>";
for (const cidVal of cid) {
  changeInDrawer.innerHTML += `<p>${cidVal[0]}: ${cidVal[1]}</p>`;
}

const calculateChange = () => {
  let change = fixFloatingPointErr(parseFloat(cash.value) - price);
  
  const cidSum = fixFloatingPointErr(cid.reduce((acc, val) => acc + val[1], 0));
  
  //no enough money
  if (change < 0) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  // No change
  if (change === 0) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }
  
  //Status Closed
  if (change > 0 && change === cidSum) {
    changeDue.innerHTML = "<p>Status: CLOSED</p>";
    for (const val of cid) {
      if (val[1]) {
        changeDue.innerHTML += `<p>${val[0]}: \$${val[1]}</p>`;
      }
    }
    return;
  }

  //
  if(cidSum < change) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  //Open or Insufficient funds
  if (change > 0 && cidSum > change) {
    cid.reverse();
    let changeArray = [];
    for (const val of cid) {
      let acc = 0;
      while (change >= currency[val[0]]) {
        if (acc >= val[1]) {
          break;
        }
        change = fixFloatingPointErr(change - currency[val[0]]);
        acc = fixFloatingPointErr(acc + currency[val[0]]);
      }
      changeArray.push([val[0], acc]);        
    }

    //update cid
    for (let i = 0; i < cid.length; i++) {
      cid[i][1] = fixFloatingPointErr(cid[i][1] - changeArray[i][1]);
    }

    //
    cid.reverse();
    
    //Status: Open
    if (change === 0) {
      //show changes
      changeDue.innerHTML = "<p>Status: OPEN</p>";
      for (const val of changeArray) {
        if (val[1]) {
          changeDue.innerHTML += `<p>${val[0]}: \$${val[1]}</p>`;
        }
      }

      //change in drawer
      changeInDrawer.innerHTML = "<legend>Change in drawer</legend>";
      for (const cidVal of cid) {
        changeInDrawer.innerHTML += `<p>${cidVal[0]}: ${cidVal[1]}</p>`;
      }

    //Status: Insufficient
    } else {
      changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    }
  }

}

purchaseBtn.addEventListener("click", () => {
  calculateChange();
});
