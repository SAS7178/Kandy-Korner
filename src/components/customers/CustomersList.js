import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Customers.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user`)
                .then(response => response.json())
                .then((customerArray) => {
                    setCustomers(customerArray)
                })

        },
        [] // When this array is empty, you are observing initial component state
    )

    return <>
        <h2>All Customers</h2>
        <article className="customers">
            {customers.map(
                (customer) => {
                    return <section className="customer" key={`customer--${customer.id}`} >
                        <div className="customer__List">
                            <Link className="customer__link" to={`/customer/details/${customer.id}`} onClick={() => {
                                navigate('/customer/details')
                            }} >
                                {customer.user.name}</Link>
                            <div><b>{customer?.user?.email}</b></div>
                        </div>
                    </section>
                })
            }
        </article>
    </>
}
