import "./Products.css"
import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom"


export const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [expensive, setExpensive] = useState(false)
    const [filteredProducts, setFiltered] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    
    useEffect(
        () => {
            if (products) {
                fetch(`http://localhost:8088/products?_sort=name&_order=desc&_expand=type`)
                    .then(response => response.json())
                    .then((products) => {
                        setProducts(products)
                        setFiltered(products)
                    })
            }
        },
        [] // When this array is empty, you are observing initial component state
    )
 
    useEffect(
        () => {
            if (expensive) {
                const expensiveProduct = products.filter(product => product.price > 2.00)
                setFiltered(expensiveProduct)
            } else {
                setFiltered(products)
            }
        },
        [expensive]
    )

    return <>
        <h1> Kandy Korner</h1>
        <>
            <div className="product__header">
                <button className="price__button" onClick={() => { setExpensive(true) }}>Top Priced</button>
                
                 <button className="price__button"  onClick={() => {
                    navigate('/product/create')
                }}> Create Kandy</button>
            
                <button className="price__button" onClick={() => { setExpensive(false) }}>Show All</button>
            </div>
        </>
        <h2>List of Products</h2>

        <article className="products">

            {
                filteredProducts.map( 

                    (product) => {
                        return <section className="product" key={`product--${product.id}`} >
                            <div className="product__item">{product.name}
                                &nbsp;&nbsp;(${product.price}) this Kandys' {product.type.name} item.
                            </div>
                        </section>
                    }
                )
            }
        </article>
    </>
}
