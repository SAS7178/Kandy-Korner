import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./EmployeeForm.css"

export const EmployeeHireForm = () => {
    const [employees, setEmployees] = useState([])
    const [employeeLocations, setLocation] = useState([])


    useEffect(
        () => {
            if (employees) {
                fetch(`http://localhost:8088/employees?_expand=user`)
                    .then(response => response.json())
                    .then((employees) => {
                        setEmployees(employees)
                    })
            }
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((location) => {
                    setLocation(location)
                })

        },
        [] // When this array is empty, you are observing initial component state
    )

    const Dropdown = ({ label, options, onChange }) => {
        return (
            <label>
                {label}
                <select onChange={(evt) => onChange(evt)} >
                    <option value={0}>Store Locations</option>
                    {options.map((option) => (
                        <option value={option.id} key={option.id}>{option.name} </option>
                    ))
                    }
                </select>
            </label>
        );
    };


    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [employee, update] = useState({

        name: "employee.name",
        locationId: "employee.locationId",
        startDate: " employee.startDate",
        payRate: "employee.rate"
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const navigate = useNavigate()
    const localKandyUser = localStorage.getItem("kandy_user")
    const newEmployee = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        //     // TODO: Create the object to be saved to the API

        const userToSendToApi = {
            name: employee.name,
            email: employee.email,
            isStaff: true
        }


        const employeeToSendToApi = {
            name: employee.name,
            email: employee.email,
            userId: 0,
            locationId: employee.locationId,
            startDate: employee.startDate,
            payRate: employee.payRate
        }


        return fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSendToApi)
        })
            .then(response => response.json())
            .then((newUser) => {
                employeeToSendToApi.userId = newUser.id
                return fetch(`http://localhost:8088/employees`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employeeToSendToApi)
                })
            })
            .then(() => navigate("/employee"))
    }

    // TODO: Perform the fetch() to POST the object to the API
    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        value={newEmployee.name}
                        onChange={(evt) => {
                            const copy = { ...employee }
                            copy.name = evt.target.value
                            update(copy)
                        }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Email</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        value={newEmployee.email}
                        onChange={(evt) => {
                            const copy = { ...employee }
                            copy.email = evt.target.value
                            update(copy)
                        }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">location</label>
                    <Dropdown
                        options={employeeLocations}
                        onChange={(evt) => {
                            const copy = { ...employee }
                            copy.locationId = evt.target.value
                            update(copy)
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Date Started</label>
                    <input
                        required autoFocus
                        typeof=""
                        className="form-control"
                        placeholder="MM/DD/YYYY"
                        value={newEmployee.startDate}
                        onChange={(evt) => {
                            const copy = { ...employee }
                            copy.startDate = evt.target.value
                            update(copy)
                        }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="payRate">Pay Rate</label>
                    <input
                        required autoFocus
                        typeof="number"
                        className="form-control"
                        placeholder="Employee Rate"
                        value={newEmployee.rate}
                        onChange={(evt) => {
                            const copy = { ...employee }
                            copy.payRate = evt.target.value
                            update(copy)
                        }
                        } />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn-button">
                Input Employee
            </button>
        </form>
    )
}