import { Outlet, Routes, Route } from "react-router-dom"
import { LocationsList } from "../locations/Locations"
import { ProductsList } from "../Products/Product";
import { ProductForm } from "../productForm/ProductForm";
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
			
			<Route path="products" element={<ProductsList />} />
			<Route path="products/create" element={<ProductForm />} />
			<Route path="locations" element={<LocationsList />} />
		</Routes>
	)
}
