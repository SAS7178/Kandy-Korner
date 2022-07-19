import { Outlet, Routes, Route } from "react-router-dom"
import { LocationsList } from "../locations/Locations"
import { ProductsList } from "../Products/Product";
import { KandyContainer } from "../Products/kandys/KandyContainer";

export const CustomerViews = () => {
	return (

		<Routes>

			<Route path="/CustomerView" element={
				<>
					<h1>Welcome to Kandy Korner!</h1>
					<Outlet />
				</>
			}>
			</Route>
            <Route path="kandys" element={<KandyContainer />} />
			<Route path="locations" element={<LocationsList />} />
			<Route path="products" element={<ProductsList />} />
			
		</Routes>
	)
}
