import { useEffect, useState } from "react"
//import { Link, useNavigate } from "react-router-dom"
//import { ProductsList } from "../Product"
import "./EmployeeForm.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    //const navigate = useNavigate()

    // const localKandyUser = localStorage.getItem("kandy_user")
    // const kandyUserObject = JSON.parse(localKandyUser)


    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=location`)
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })

        },
        [] // When this array is empty, you are observing initial component state
    )

    return <>
        <h2>All Employees</h2>

        <article className="employees">
            {
                employees.map(
                    (employee) => {
                        return <section className="employee" key={`employee--${employee.id}`} >
                            <div className="employee__List">
                                <header><b>{employee.name}</b></header>
                                <div><b>{employee?.location?.name}</b></div>
                            </div>
                        </section>
                    }
                )
            }
        </article>
    </>
}