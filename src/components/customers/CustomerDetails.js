import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    const { customerId } = useParams()
    const [customer, updateCustomer] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)
                })
        },
        [customerId]
    )

    return <><section className="customer" key={`${customerId}`}  >
        <div className="customer__List">
            <div><b>Name:{customer?.user?.name}</b></div>
            <div><b>Email:{customer?.user?.email}</b></div>
            <div><b>loyalty Number:{customer?.loyaltyNumber}</b></div>
        </div>
    </section></>
}






