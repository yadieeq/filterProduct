// images 
// price 
// category
// name

const categoryShema = {
    1: 'Каши',
    2: 'Овощи и яйца'
}

const priceFilter = {
    1: {
        text: "0 - 50",
        min: 0,
        max: 50
    }
}

//price = all, 0 - 50, 51 - 100, 101 - 180, 181 - Infinity

const datas = [{
        name: 'Kasha',
        images: 'i/im1.jpg',
        category: 1,
        price: 50,
        _id: 'asda'
    },
    {
        name: 'Vagatables (eggs)',
        images: 'i/im2.jpg',
        category: 2,
        price: 70,
        _id: 'sadad'
    },
]