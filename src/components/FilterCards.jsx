import { useEffect, useState } from 'react'
import './filter.css'

export default function FilterCards() {

    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])

    async function fetchProducts() {
        try {
            setIsLoading(true)
            const apiResponse = await fetch('https://dummyjson.com/products', {
                method: 'GET'
            })

            const result = await apiResponse.json()

            if (result && result.products && result.products.length > 0) {
                setIsLoading(false)
                setProducts(result.products)
            }

        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            {isLoading ?
                <p className="loading">Nous recherchons vos articles ! Merci de patientez quelques instants...</p>
                :
                <ul className="products-list">
                    {products && products.length > 0 ?
                        products.map(product => (
                            <li key={product.id} className="product">
                                <p className="product-name">{product.title}</p>
                                <button className="product-category">{product.category}</button>
                            </li>
                        ))
                        :
                        null
                    }
                </ul>
            }
        </>
    )
}