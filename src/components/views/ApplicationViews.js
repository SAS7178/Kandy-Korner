import { CustomerViews } from "./CustomerView";
import { EmployeeViews } from "./EmployeeView";

export const ApplicationViews = () => {
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    
   if (kandyUserObject.staff === "true") {
        //return employee views
         return <EmployeeViews />
    } else {
        //return customer views
         return <CustomerViews />
    
    }
    
}