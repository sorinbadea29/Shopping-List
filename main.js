const form = document.getElementById('form');
const addInput = document.getElementById('add-input');
const labels = document.querySelector('.labels');
const quantInput = document.getElementById('quant');
const unitInput = document.getElementById('unit');
const totalElement = document.getElementById('total-div');
const filter = document.getElementById('filter-input');
const cartItems = document.getElementById('cart-items');

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', addToList);
    filter.addEventListener('keyup', ui.filterItems);
});

function Item(addInput, quantInput, unitInput){
    this.addInput = addInput;
    this.quantInput = quantInput;
    this.unitInput = unitInput;
};
let item = new Item;

function Ui(){};
let ui = new Ui;

Ui.prototype.createItem = function(item){
    let row = document.createElement('div');
    row.classList.add('row');
    let rowContent = `
    <button class="btn check"><i class="fas fa-check"></i></button>
    <p class="item list-item">${item.addInput.value}</p>
    <p class="quant-select">${item.quantInput.value}</p>
    <p class="unit-select">${item.unitInput.value}</p>
    <input class="price" type="number" min="0">
    <button class="btn btn-danger"><i class="fas fa-trash "></i></button>`;
    row.innerHTML = rowContent;
    cartItems.append(row);

    if(cartItems !== ''){
        labels.classList.add('show-flex');
    }else{
        labels.classList.remove('show-flex');
    };
};

Ui.prototype.setMessage = function(nameOfClass, message, time){
    let msg = document.querySelector('.msg');
    msg.classList.add(nameOfClass);
    msg.innerText = message;
    setTimeout(() => msg.classList.remove(nameOfClass), time);   
};

Ui.prototype.checkItem = function(target){
    target.parentElement.parentElement.classList.toggle('toggleCheck');
};

Ui.prototype.deletItem = function(target){
    target.parentElement.parentElement.remove();
    labels.classList.remove('show-flex');
};

Ui.prototype.updateCartTotal = function(total){
    total = 0;
    let rows = document.querySelectorAll('.row');
    rows.forEach(function(row){
        let priceElement = row.querySelector('.price');
        let price = Number(priceElement.value);
        price === 0;
        if(isNaN(price) || price <= 0){
            price = 0;
            priceElement.classList.add('red');
        }else{
            price = price;
            priceElement.classList.add('green');
        };
        total += price;
    });
    total = Math.round(total * 100) / 100; 
    document.getElementById('total-value').innerText = `${total} eur`;

    if(total != 0){
        totalElement.classList.add('show');
    }else{
        totalElement.classList.remove('show');
    };
};

Ui.prototype.clearInputs = function(){
    addInput.value = '';
    quantInput.value = '';
    unitInput.value = '';
};

Ui.prototype.filterItems = function(e){
    let filterText = e.target.value.toLowerCase();
    let items = document.getElementsByClassName('item');
    Array.from(items).forEach(function(item){
        let itemText = item.textContent;
        if(itemText.indexOf(filterText) != -1){
            item.parentElement.style.display = 'flex';
        }else{
            item.parentElement.style.display = 'none';
        };
    });
};


function addToList(e){
    e.preventDefault();
    if(addInput.value === ''){
        ui.setMessage('red', 'Add some items down below...', 3000);
    }else{
        let items = document.getElementsByClassName('item');
        for(let i=0; i<items.length; i++){
            let itemText = items[i].innerText;
            if(itemText === addInput.value){
                ui.setMessage('red', 'This item is already added to the list', 3000);
                return;
            };
        };
        item = new Item(addInput, quantInput, unitInput);
        ui.createItem(item);
        ui.setMessage('green', 'Item Adeed', 2000);
        ui.clearInputs();
        addInput.focus();
        let prices = document.querySelectorAll('.price')
        prices.forEach(price => price.addEventListener('change', ui.updateCartTotal));
    };
};    

cartItems.addEventListener('click', e => {
    if(e.target.parentElement.classList.contains('check')){
        ui.checkItem(e.target);
    };
    if(e.target.parentElement.classList.contains('btn-danger')){
        ui.deletItem(e.target);
        ui.updateCartTotal();
    };
});
