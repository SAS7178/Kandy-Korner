import { Outlet, Routes, Route } from "react-router-dom"
import { LocationsList } from "../locations/Locations"
import { ProductsList } from "../Products/Product";

export const ApplicationViews = () => {
	return (

		<Routes>

			<Route path="/" element={
				<>
					<h1> Kandy Korner</h1>
				</>
			}>
			</Route>
			<Route path="products" element={<ProductsList />} />
			<Route path="locations" element={<LocationsList />} />
		</Routes>
	)
}
