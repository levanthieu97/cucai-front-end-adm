const Menu = [
    {
        title: 'Trang chủ',
        group: 'dsb',
        icon: 'house',
        name: 'Dashboard'
    },
    {
        title: 'Sản phẩm',
        group: 'products',
        icon: 'shopping_cart',
        name: 'ProductsMaster',
        items: [
            {
                title: 'Danh sách sản phẩm',
                component: 'Products'
            }
        ]
    },

];

export default Menu;