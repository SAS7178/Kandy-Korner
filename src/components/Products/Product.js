import "./Products.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const ProductsList = () => {
    const [products, setproducts] = useState([])
    //     const [filteredTickets, setFiltered] = useState([])
    //     const [emergency, setEmergency] = useState(false)
    //     const [openOnly, updateOpenOnly] = useState(false)
    //const navigate = useNavigate()



    useEffect(
        () => {
            if (products) {
                fetch(`http://localhost:8088/products`)
                    .then(response => response.json())
                    .then((products) => {
                        setproducts(products)
                    })
            }
        },
        [] // When this array is empty, you are observing initial component state
    )

    return <>
        <h1> Kandy Korner</h1>
        <h2>List of Products</h2>
        <button onClick={() => ("/product")}>Top Priced</button>
        <article className="products">
            {
                products.map(
                    (product) => {
                        return <section className="product" key={`product--${product.id}`} >
                            <div>{product.name}:&nbsp;&nbsp;{product.price}</div>
                        </section>
                    }
                )
            }
        </article>
    </>
}
