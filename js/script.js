// const
const productMinPrice = document.querySelector("#product-min_price")
const productMaxPrice = document.querySelector("#product-max_price")
const selectType = document.querySelector('#product-type')
const discountCheck = document.querySelector("#product-discount")
const menuWrapper = document.querySelector('.menu-wrapper')

const addBtn = document.querySelector(".add-btn")
const addMenu = document.querySelector(".add-menu")
const overlay = document.querySelector(".overlay")

const addName = document.querySelector(".add-name")
const addPrice = document.querySelector(".add-price")
const addImgSrc = document.querySelector(".add-img_src")
const addMenuImgDiv = document.querySelector(".add-menu__img-div")
const addType = document.querySelector(".add-type")
const addClose = document.querySelector(".add-close")
const addApply = document.querySelector(".add-apply")

const addMenuImg = document.querySelector(".add-menu-img")
const addMenuImgClose = document.querySelector(".close-img")

let imageBase64 = null
const reader = new FileReader()


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

const showListProductsHTML = () => {
    let listResultHTML = ''
    for (let i = 0; i < productsData.length; i++) {
        listResultHTML += createOneProductHTML(productsData[i])
    }
    menuWrapper.innerHTML = listResultHTML
}


// ------------ filters ----------------
const filterProducts = () => {
    const selectedMinimalPrice = productMinPrice.value
    const selectedMaximalPrice = productMaxPrice.value
    const selectedTypeFilter = selectType.value
    const selectedDiscount = discountCheck.checked

    const min = selectedMinimalPrice == "" ? 0 : +selectedMinimalPrice
    const max = selectedMaximalPrice == "" ? Infinity : +selectedMaximalPrice


    const filtered = productsData.filter((elem) => {
        const isPrice = elem.price >= min && elem.price <= max
        const isCategory = selectedTypeFilter == 0 ? true : elem.category == selectedTypeFilter;
        const isDiscount = selectedDiscount == false ? true : elem.isDiscount;
        return isPrice && isCategory && isDiscount;
    })

    menuWrapper.innerHTML = filtered.map(createOneProductHTML).join("")
}

productMinPrice.oninput = filterProducts
productMaxPrice.oninput = filterProducts
discountCheck.onchange = filterProducts
selectType.onchange = filterProducts


// ------------- add product -------------
const disableAddMenuImg = () => {
    addImgSrc.classList.remove("display-none")

    addMenuImg.classList.add("display-none")
    addMenuImgClose.classList.add("display-none")
}
const enableAddMenuImg = () => {
    addImgSrc.classList.add("display-none")

    addMenuImg.classList.remove("display-none")
    addMenuImgClose.classList.remove("display-none")
}

reader.onload = (event) => {
    imageBase64 = event.target.result
    enableAddMenuImg()
    addMenuImg.src = imageBase64
}

addMenuImgClose.onclick = () => {
    disableAddMenuImg()
    addImgSrc.value = ""
    imageBase64 = null
}

const toggleAddMenuVisibility = () => {
    addMenu.classList.toggle("display-none")
    overlay.classList.toggle("display-none")
    clearErrorPole()
    clearAddMenu()
}

const clearErrorOnChange = (tag) => {
    tag.classList.remove("border-red")
}

addName.onchange = () => clearErrorOnChange(addName)
addImgSrc.onchange = () => clearErrorOnChange(addImgSrc)
addPrice.onchange = () => clearErrorOnChange(addPrice)
addType.onchange = () => clearErrorOnChange(addType)

const clearErrorPole = () => {
    addName.classList.remove("border-red")
    addName.placeholder = "Название"

    addPrice.classList.remove("border-red")
    addPrice.placeholder = "Цена";

    addImgSrc.classList.remove("border-red")

    addType.classList.remove("border-red")


}
const clearAddMenu = () => {
    addName.value = ""
    addImgSrc.value = ""
    addType.value = 0
    addPrice.value = ""
    imageBase64 = null
    disableAddMenuImg()
}

addImgSrc.onchange = () => {
    const file = addImgSrc.files[0];
    if (file) {
        reader.readAsDataURL(file);
    }
};
const addProduct = () => {
    // const
    const isName = onValidationText(addName);
    const isPrice = onValidationText(addPrice);
    const isFile = onValidationFile(addImgSrc);
    const isCategory = onValidationSelect(addType);

    // if error
    if (isName || isPrice || isFile || isCategory) return 'Error'

    // logical

    const newProduct = {
        name: addName.value,
        imageSrc: imageBase64,
        category: addType.value,
        price: addPrice.value,
        _id: generateID(),
    }
    productsData.push(newProduct)

    // starts
    showListProductsHTML()
    toggleAddMenuVisibility()
    clearAddMenu()
    clearErrorPole()
    saveProducts()
    filterProducts()

}

const onValidationText = (tag) => {
    const isEmpty = tag.value == "" ? true : false;
    if (isEmpty) tag.classList.add("border-red")
    tag.placeholder = "Поле не может быть пустым"
    return isEmpty;
}
const onValidationFile = (tag) => {
    const isEmpty = tag.files.length == 0 ? true : false;
    if (isEmpty) tag.classList.add("border-red")
    tag.placeholder = "Поле не может быть пустым"
    return isEmpty;
}
const onValidationSelect = (tag) => {
    const isEmpty = tag.value == 0 ? true : false;
    if (isEmpty) tag.classList.add("border-red")
    tag.placeholder = "Поле не может быть пустым"
    return isEmpty;
}



addBtn.onclick = toggleAddMenuVisibility
addClose.onclick = toggleAddMenuVisibility
addApply.onclick = addProduct


// ---------- localstorage -----------
const localStorageNames = {
    SAVED_FILTER_TYPE : "savedFilterType",
    SAVED_MIN_PRICE : "SavedMinPrice",
    SAVED_MAX_PRICE : "SavedMaxPrice",
    SAVED_PRODUCTS : "SavedProducts",
}

// save filters
const saveFilterType = () => {
    localStorage.setItem(localStorageNames.SAVED_FILTER_TYPE, +selectType.value)
}
const saveFilterMinPrice = () => {
    localStorage.setItem(localStorageNames.SAVED_MIN_PRICE, +productMinPrice.value)
}
const saveFilterMaxPrice = () => {
    localStorage.setItem(localStorageNames.SAVED_MAX_PRICE, +productMaxPrice.value)
}
selectType.addEventListener("change", saveFilterType)
productMinPrice.addEventListener("change", saveFilterMinPrice)
productMaxPrice.addEventListener("change", saveFilterMaxPrice)

// save products data
const saveProducts = () => {
    localStorage.setItem(localStorageNames.SAVED_PRODUCTS, JSON.stringify(productsData))
}

// onload localStorage
const onLoadStorage = () => {
    const savedMinPrice = localStorage.getItem(localStorageNames.SAVED_MIN_PRICE)
    const savedMaxPrice = localStorage.getItem(localStorageNames.SAVED_MAX_PRICE)
    const savedType = localStorage.getItem(localStorageNames.SAVED_FILTER_TYPE)
    const savedData = localStorage.getItem(localStorageNames.SAVED_PRODUCTS)
    
    if (savedData) productsData = JSON.parse(savedData)

    savedType == null ? selectType.value = 0 : selectType.value = savedType
    savedMinPrice <= 0 ? productMinPrice.value = "" : productMinPrice.value = savedMinPrice
    savedMaxPrice <= 0 ? productMaxPrice.value = "" : productMaxPrice.value = savedMaxPrice
}


// starts
addCategoryOptionsHTML()
onLoadStorage()
filterProducts()