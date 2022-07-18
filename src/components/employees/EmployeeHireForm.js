import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./EmployeeForm.css"

export const EmployeeHireForm = () => {
    const [employees, setEmployees] = useState([])
    const [employeeLocations, setLocation] = useState({})

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
            <select  onChange={(evt) => onChange(evt)}>
                <option value={0}>Store Locations</option>
              {options.map((option) => (
                <option value={option.id}>{option.name}</option>
             
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

        name: "",
        location: '',
        startDate: '',
        rate: "number"
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
        const employeeToSendToApi = {

            name: newEmployee.name,
            Location: newEmployee?.location?.name,
            Startdate: '',
            rate: newEmployee?.rate
        }


        return fetch(`http://localhost:8088/employees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeToSendToApi)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/employees")
            })
      
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
                            const copy = { ...employees }
                            copy.name = evt.target.value
                            update(copy)
                        }
                        } />
                </div>
            </fieldset>

            <fieldset>         
            <Dropdown
                    label="Store Location"
                    options={employeeLocations}
                    onChange={ (evt) => {
                        const copy = {...employeeLocations.location}
                        copy.location = evt.target.value
                        update(copy)
                    }}
                    />
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Date Started</label>
                    <input
                        required autoFocus
                        typeof=""
                        className="form-control"
                        placeholder="Employee Start Date"
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
                            copy.rate = evt.target.value
                            update(copy)
                        }
                        } />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-button">
                Submit Application
            </button>
        </form>
    )
}