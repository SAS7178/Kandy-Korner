import { Outlet, Routes, Route } from "react-router-dom"
import { LocationsList } from "../locations/Locations"
import { ProductsList } from "../Products/Product";
import { ProductForm } from "../productForm/ProductForm";
import { KandyContainer } from "../Products/kandys/KandyContainer";
import { EmployeeHireForm } from "../employees/EmployeeHireForm";
import { CustomerDetails } from "../customers/CustomerDetails";
import { CustomerList } from "../customers/CustomersList";

export const EmployeeViews = () => {
	return (

		<Routes>

			<Route path="/EmployeeView" element={
				<>
					<h1> Welcome to Kandy Korner!</h1>
					<Outlet />
				</>
			}>
			</Route>
            <Route path="kandys" element={<KandyContainer />} />
			<Route path="employee/form" element={<EmployeeHireForm />} />
			<Route path="customer/details/:customerId" element={<CustomerDetails />} />
			<Route path="customers" element={<CustomerList />} />
			<Route path="locations" element={<LocationsList />} />
			<Route path="products" element={<ProductsList />} />
			<Route path="product/create" element={<ProductForm />} />
		</Routes>
	)
}