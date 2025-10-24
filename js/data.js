// images 
// price 
// category
// name


// ----- helper -------------
// helper
function generateID() {
    return Math.random().toString().slice(2) + '-' + Date.now();
}


const categoryShema = {
    1: 'Каши',
    2: 'Овощи и яйца',
    3: 'Перекусы',
    4: 'Первое',
    5: 'Сладкое'
}

const priceFilter = {
    1: {
        text: "0 - 50",
        min: 0,
        max: 50
    },
    2: {
        text: "51 - 100",
        min: 51,
        max: 100
    },
    3: {
        text: "101 - 150",
        min: 101,
        max: 150
    }
}

//price = all, 0 - 50, 51 - 100, 101 - 180, 181 - Infinity

let productsData = [{
        name: 'Овсянка',
        imageSrc: 'i/im1.jpg',
        category: 1,
        price: 80,
        _id: generateID(),
        isDiscount : true,
    },
    {
        name: 'Яйца с овощами',
        imageSrc: 'i/im2.jpg',
        category: 2,
        price: 70,
        _id: generateID()
    },
    {
        name: 'Ланч',
        imageSrc: 'i/im3.jpg',
        category: 3,
        price: 30,
        _id: generateID(),
        isDiscount : true,
    },
    {
        name: 'Суп',
        imageSrc: 'i/im4.jpg',
        category: 4,
        price: 140,
        _id: generateID()
    },
    {
        name: 'Сырники',
        imageSrc: 'i/im5.jpg',
        category: 5,
        price: 90,
        _id: generateID(),
        isDiscount : true,
    },
]