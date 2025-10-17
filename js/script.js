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
//7 createOptionFromCategories +
//8 createOptionFromPrice +


//9 - 10 filerPrice, filterCategory

// ------------------------------------------------------------------------------

// const
const selectPrice = document.querySelector('#product-price')
const selectType = document.querySelector('#product-type')
const discountCheck = document.querySelector("#product-discount")
const menuWrapper = document.querySelector('.menu-wrapper')

const addBtn = document.querySelector(".add-btn")
const addMenu = document.querySelector(".add-menu")
const overlay = document.querySelector(".overlay")
const addName = document.querySelector(".add-name")
const addPrice = document.querySelector(".add-price")
const addImgSrc = document.querySelector(".add-img_src")
const addType = document.querySelector(".add-type")
const addClose = document.querySelector(".add-close")
const addApply = document.querySelector(".add-apply")





// logical
// ------------- html creat --------------
const createOneProductHTML = (elem) => `
        <div class="menu__card f-s-s-c">
            <img src="${elem.imageSrc}" alt="${elem.name}">
            <h3>${elem.name}</h3>
            <h4>${categoryShema[elem.category]}</h4>
            <h4>${elem.price}</h4>
        </div>
    `
const createOptionFromCategories = (elem, key) => `<option value="${key}">${elem}</option>`
const createOptionFromPrice = (elem, key) => `<option value="${key}">${elem}</option>`


// ------------ add html to page -------------
// --- select ---
const addCategoryOptionsHTML = () => {
    let optionsResultHTML = '<option value="0">Все категории</option>'
    for (let key in categoryShema) {
        optionsResultHTML += createOptionFromCategories(categoryShema[key], key)
    }
    selectType.innerHTML = optionsResultHTML
    addType.innerHTML = optionsResultHTML
}

const addPriceOprionsHTML = () => {
    let optionsResultHTML = '<option value="0">Любая цена</option>'
    for (const key in priceFilter) {
        optionsResultHTML += createOptionFromPrice(priceFilter[key].text, key)
    }
    selectPrice.innerHTML = optionsResultHTML
}
//  --- list ---
const showListProductsHTML = () => {
    let listResultHTML = ''
    for (let i = 0; i < productsData.length; i++) {
        listResultHTML += createOneProductHTML(productsData[i])
    }
    menuWrapper.innerHTML = listResultHTML
}


// ------------ filters ----------------
const filterProducts = () => {
    const selectedPriceFilter = selectPrice.value
    const selectedTypeFilter = selectType.value
    const selectedDiscount = discountCheck.checked

    if (selectedPriceFilter == 0 && selectedTypeFilter == 0) return menuWrapper.innerHTML = productsData.map(createOneProductHTML).join("")

    //! ----------------------------
    const {
        min,
        max
    } = priceFilter[selectedPriceFilter] || {
        min: 0,
        max: Infinity
    }
    
    const filtered = productsData.filter((elem) => {
            const isPrice = elem.price >= min && elem.price <= max
            const isCategory = selectedTypeFilter == 0 ? true : elem.category == selectedTypeFilter;
            const isDiscount = selectedDiscount == false ? true : elem.isDiscount;
            return isPrice && isCategory && isDiscount;
            // if (selectedTypeFilter == 0) return elem.price >= min && elem.price <= max
            // if (selectedTypeFilter != 0) return elem.price >= min && elem.price <= max && elem.category == selectedTypeFilter
        })


    //! ----------------------------
    // let filtered = productsData
    // if (selectedPriceFilter != 0) {
    //     const {min, max} = priceFilter[selectedPriceFilter]
    //     filtered = filtered.filter((elem) => {
    //         return elem.price >= min && elem.price <= max
    //     })
    // }

    // if (selectedTypeFilter != 0){
    //     filtered = filtered.filter((elem) => {
    //         return elem.category == selectedTypeFilter
    //     })
    // }
    //! ----------------------------
    menuWrapper.innerHTML = filtered.map(createOneProductHTML).join("")
}

selectPrice.onchange = filterProducts
selectType.onchange = filterProducts


// ------------- add product -------------
const toggleAddMenuVisibility = () => {
    addMenu.classList.toggle("display-none")
    overlay.classList.toggle("display-none")
}

addBtn.onclick = toggleAddMenuVisibility
addClose.onclick = toggleAddMenuVisibility



// starts
showListProductsHTML()
addCategoryOptionsHTML()
addPriceOprionsHTML()