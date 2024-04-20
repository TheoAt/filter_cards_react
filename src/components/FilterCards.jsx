import { useEffect, useState } from 'react'
import './filter.css'

export default function FilterCards() {

    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [currentSelectedCategory, setCurrentSelectedCategory] = useState('')

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
                setFilteredProducts(result.products)
            }

        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        const cpyProducts = [...products]
        setFilteredProducts(
            currentSelectedCategory !== '' ?
                cpyProducts.filter(product => product.category.toLowerCase() === currentSelectedCategory.toLowerCase())
                :
                cpyProducts
        )

    }, [currentSelectedCategory])

    const categories = products && products.length > 0 ? [...new Set(products.map(product => product.category))] : []

    return (
        <>
            {isLoading ?
                <p className="loading">Nous recherchons vos articles ! Merci de patientez quelques instants...</p>
                :
                <div className="filter-container">
                    <div className="filter-categories-container">
                        {categories.map(category => (
                            <button className={`${currentSelectedCategory === category ? 'active' : ''}`} onClick={() => setCurrentSelectedCategory(currentSelectedCategory !== '' && currentSelectedCategory === category ? '' : category)}>
                                {category}
                            </button>
                        ))}
                    </div>
                    <ul className="products-list">
                        {filteredProducts && filteredProducts.length > 0 ?
                            filteredProducts.map(product => (
                                <li key={product.id} className="product">
                                    <p className="product-name">{product.title}</p>
                                    <button className="product-category">{product.category}</button>
                                </li>
                            ))
                            :
                            null
                        }
                    </ul>
                </div>
            }
        </>
    )
}