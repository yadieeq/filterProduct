// const 

// logical 
// helper
// generateID +

// createProduct 

// filerPrice 
// filterCategory 
// createOneProductHTML 
// showListProductsHTML 
// createOptionFromCategories
// createOptionFromPrice
// events 

// starts


// Plans 
//-1 create repositories +
//0 connect repositories with your comp +

// 1 write html +
// 2 add css +
// 3 add js 
//4 get elements from html +
//5 createOneProductHTML +
//6 showListProductsHTML +
//7 createOptionFromCategories !
//8 createOptionFromPrice
//9 - 10 filerPrice, filterCategory

// ------------------------------------------------------------------------------

// const
const selectPrice = document.querySelector('#product-price')
const selectType = document.querySelector('#product-type')

const menuWrapper = document.querySelector('.menu-wrapper')

// helper
let _firstID = 1000

function generateID() {
    _firstID += 1
    return _firstID
}

// logical
const createOneProductHTML = (elem) =>
    `
        <div class="menu__card f-s-s-c">
            <img src="${elem.imageSrc}" alt="${elem.name}">
            <h3>${elem.name}</h3>
            <h4>${categoryShema[elem.category]}</h4>
            <h4>${elem.price}</h4>
        </div>
    `

const showListProductsHTML = () => {
    let listResultHTML = ''
    for (let i = 0; i < productsData.length; i++) {
        listResultHTML += createOneProductHTML(productsData[i])
    }
    menuWrapper.innerHTML = listResultHTML
}


const createOptionFromCategories = (elem) => 
    `<option value="${elem}">${elem}</option>`

const addCategoryOptionsHTML = () => {
    let optionsResultHTML = '<option value="0">Все категории</option>'
    for(let i in categoryShema) {
        optionsResultHTML += createOptionFromCategories(categoryShema[i])
    }
    selectType.innerHTML = optionsResultHTML
}


const createOptionFromPrice = (elem) => 
    `<option value="${elem}">${elem}</option>`

const addPriceOprionsHTML = () => {
    let optionsResultHTML = '<option value="0">Любая цена</option>'
    for(let i in priceFilter) {
        optionsResultHTML += createOptionFromPrice(priceFilter[i].text)
    }
    selectPrice.innerHTML = optionsResultHTML
}

// starts
showListProductsHTML()
addCategoryOptionsHTML()
addPriceOprionsHTML()