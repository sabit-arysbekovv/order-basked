let menu_list = document.getElementById("menu-list")
let orders_list = document.getElementById("orders-list")
let sum = document.getElementById("sum")
let items_count = document.getElementById("items-count")

const renderMenuItem = (product) => {
    return`
    <div class="food-card" data-product='${JSON.stringify(product)}' onClick ="onClickCard(event)">
               <img src="${product.img}" class="food-img" >
                <div>
                    <div>${product.title}</div>
                    <div>${product.price}som</div>
                </div>
            </div>`;
};
const renderOrderItem = (orderItem) => {
    return`
   <li class = "order-item" data-order='${JSON.stringify(orderItem)}' onClick ="onDelete(event)">
   <div>${orderItem.title}</div>
   <span>count${orderItem.count}</span>
   <span>price${orderItem.price}</span>
   <img src="./img/delete.png">
   </li>`;
};
const renderOrders = () => {
    let items = []
    orders_basked.map((item,index)=>{
       
        items.push(renderOrderItem(item))
    })
    orders_list.innerHTML=items.join('')
}

const renderMenuList = (list) => {
    let items = []
    list.map((item,index)=>{
       
        items.push(renderMenuItem(item))
    })
    menu_list.innerHTML=items.join('')
}

const onClickCard = (event) => {
    let card = JSON.parse(event.currentTarget.dataset.product)
  
    let currentIndex = orders_basked.findIndex(el => el.id == card.id)
    if(currentIndex == -1){
        orders_basked.push({
        ...card,
    count:1
        })
    }else{
        orders_basked[currentIndex].count++
        orders_basked[currentIndex].price += card.price
    }
    renderOrders(orders_basked)
    solveSum()
    getCount()
    console.log(orders_basked)
}

const onDelete = (event) => {
    let current_order = JSON.parse(event.currentTarget.dataset.order)
    let currentIndex = orders_basked.findIndex(el => el.id == current_order.id)
    let item_price = menu_item.find(el => el.id == current_order.id).price

    if(current_order.count>1){
        orders_basked[currentIndex].price-=item_price
        orders_basked[currentIndex].count--
        
    }else{
        orders_basked.splice(currentIndex,1)
        renderOrders(orders_basked)
    }
    solveSum()
    getCount()
}

const solveSum = () => {
    sum.innerHTML = orders_basked.reduce((it,{
        price
    }) => it + price, 0)
    
}

const getCount = () => {
    items_count.innerHTML = orders_basked.reduce((el, {
        count
    }) => el + count,0)
};
renderMenuList(menu_item)