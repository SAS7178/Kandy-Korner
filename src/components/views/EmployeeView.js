import { Outlet, Routes, Route } from "react-router-dom"
import { LocationsList } from "../locations/Locations"
import { ProductsList } from "../Products/Product";
import { ProductForm } from "../productForm/ProductForm";
import { KandyContainer } from "../Products/kandys/KandyContainer";
import { EmployeeHireForm } from "../employees/EmployeeHireForm";

export const ApplicationViews = () => {
	return (

		<Routes>

			<Route path="/" element={
				<>
					<h1> Kandy Korner</h1>
					<Outlet />
				</>
			}>
			</Route>
            <Route path="kandys" element={<KandyContainer />} />
			<Route path="employee/form" element={<EmployeeHireForm />} />
			<Route path="locations" element={<LocationsList />} />
			<Route path="products" element={<ProductsList />} />
			<Route path="product/create" element={<ProductForm />} />
		</Routes>
	)
}