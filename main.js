const addBtn = document.getElementById('add-btn');
const addInput = document.getElementById('add-input');
const quantInput = document.getElementById('quant');
const unitInput = document.getElementById('unit');
const totalElement = document.getElementById('total-div');
const filter = document.getElementById('filter-input');


loadEventListeners();
function loadEventListeners(){
    form.addEventListener('submit', addItem);
    filter.addEventListener('keyup', filterItems);
};
  
function addItem(e){
    e.preventDefault();
    let msg = document.getElementsByClassName('msg')[0];
    if(addInput.value === ''){
        msg.innerText = 'Add some items down below...';
        msg.classList.add('error');
        setTimeout(() => msg.classList.remove('error'), 3000);    
    }else{
        let items = document.getElementsByClassName('item');
        for(let i=0; i<items.length; i++){
            let itemText = items[i].innerText;
            if(itemText == addInput.value){
                msg.innerText = 'This item is already added to the cart';
                msg.classList.add('error');
                setTimeout(() => msg.classList.remove('error'), 3000);
                return;
            };
        };
        
        let cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');
        let cartRowContent = `
        <button class="btn check"><i class="fas fa-check"></i></button>
        <p class="item list-item">${addInput.value}</p>
        <p class="quant-select">${quantInput.value}</p>
        <p class="unit-select">${unitInput.value}</p>
        <input class="price" type="number" min="0">
        <button class="btn btn-danger"><i class="fas fa-trash "></i></button>`;
        cartRow.innerHTML = cartRowContent;
        let cartItems = document.getElementById('cart-items');
        cartItems.append(cartRow);

        cartRow.addEventListener('click', e => {
            // Event delegetion for check button
            if(e.target.parentElement.classList.contains('check')){
                e.target.parentElement.parentElement.classList.toggle('toggleCheck');
            };
            // Event delegetion for delete button   
            if(e.target.parentElement.classList.contains('btn-danger')){
                e.target.parentElement.parentElement.remove();
                updateCartTotal();
            };
        });
        
        cartRow.getElementsByClassName('price')[0].addEventListener('change', updateCartTotal);

        clearInputs();
    };
};

function updateCartTotal(){
    let total = 0;
    let cartRows = document.getElementsByClassName('cart-row');
    for(i=0; i<cartRows.length; i++){
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('price')[0];
        let price = Number(priceElement.value);
        price === 0;
        if(isNaN(price) || price <= 0){
            price = 0;
            priceElement.style.background = '#fff';
        }else{
            price = price;
            priceElement.style.background = '#f4f4f4';
        };
        total = total + price;
    };
    total = Math.round(total * 100) / 100; 
    document.getElementById('total-value').innerText = `${total} eur`;

    if(total != 0){
        totalElement.classList.add('show-total');
    }else{
        totalElement.classList.remove('show-total');
    };
};

function filterItems(e){ 
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

function clearInputs(){
    addInput.value = '';
    quant.value = '';
    unit.value = '';
};
