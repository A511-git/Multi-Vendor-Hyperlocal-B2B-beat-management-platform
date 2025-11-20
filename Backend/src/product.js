export const getProducts = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    'id': 1,
                    'name': 'Product 1',
                    'price': 100
                },
                {
                    'id': 2,
                    'name': 'Product 2',
                    'price': 200
                },
                {
                    'id': 3,
                    'name': 'Product 3',
                    'price': 300
                }
            ])
        }, 1500)
    })
}

export const getProduct = (id)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve({
                'id': id,
                'name': `Product ${id}`,
                'price': 100
            })
        }, 1000)
    })
}