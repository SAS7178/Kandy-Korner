import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ProductForm.css"

export const ProductForm = () => {
    const [products, setProducts] = useState([])
    const [types, setTypes] = useState([])

    useEffect(
        () => {
            if (products) {
                fetch(`http://localhost:8088/types`)
                    .then(response => response.json())
                    .then((types) => {
                        setTypes(types)
                    })
            }
        },
        [] // When this array is empty, you are observing initial component state
    )

    const Dropdown = ({ label, options, onChange }) => {
        return (
          <label>
            {label}
            <select  onChange={(evt) => onChange(evt)}>
                <option value={0}>Kandy Type</option>
              {options.map((option) => (
                <option value={option.id}>{option.name}</option>
              ))}
            </select>
          </label>
        );
      };    
    useEffect(
        () => {
            if (products) {
                fetch(`http://localhost:8088/products?_expand=type`)
                    .then(response => response.json())
                    .then((types) => {
                        setProducts(types)
                    })
            }
        },
        [] // When this array is empty, you are observing initial component state
    )

    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [product, update] = useState({

        name: "",
        typeId: Number,
        price: Number
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const navigate = useNavigate()
    const localKandyUser = localStorage.getItem("kandy_user")
    //const newProductObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        //     // TODO: Create the object to be saved to the API
        const productToSendToApi = {

            name: product.name,
            typeId: product.typeId,
            price: product.price
        }


        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToApi)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/products")
            })
      
    }
    // TODO: Perform the fetch() to POST the object to the API
    return (
        <form className="productForm">
            <h2 className="productForm__title">New Product</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of Kandy"
                        value={product.name}
                        onChange={(evt) => {
                            const copy = { ...product }
                            copy.name = evt.target.value
                            update(copy)
                        }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        required autoFocus
                        typeof="number"
                        className="form-control"
                        placeholder="Price of Kandy"
                        value={product.price}
                        onChange={(evt) => {
                            const copy = { ...product }
                            copy.price = evt.target.value
                            update(copy)
                        }
                        } />
                </div>
            </fieldset>

            <fieldset>         
            <Dropdown
                    label="Kandy Type"
                    options={types}
                    onChange={ (evt) => {
                        const copy = {...product}
                        copy.typeId = parseInt(evt.target.value)
                        update(copy)
                    }}
                    />
            </fieldset>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-button">
                Submit Product
            </button>
        </form>
    )
}