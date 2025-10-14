// images 
// price 
// category
// name

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

const productsData = [{
        name: 'Овсянка',
        imageSrc: 'i/im1.jpg',
        category: 1,
        price: 80,
        _id: '0001'
    },
    {
        name: 'Яйца с овощами',
        imageSrc: 'i/im2.jpg',
        category: 2,
        price: 70,
        _id: '0002'
    },
    {
        name: 'Ланч',
        imageSrc: 'i/im3.jpg',
        category: 3,
        price: 30,
        _id: '0003'
    },
    {
        name: 'Суп',
        imageSrc: 'i/im4.jpg',
        category: 4,
        price: 140,
        _id: '0004'
    },
    {
        name: 'Сырники',
        imageSrc: 'i/im5.jpg',
        category: 5,
        price: 90,
        _id: '0005'
    },
]