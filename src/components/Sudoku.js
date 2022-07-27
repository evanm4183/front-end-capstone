import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { NavBar } from "./nav/NavBar"
import { Views } from "./views/Views"
import { PrintScreen } from "./print-screen/PrintScreen"

export const Sudoku = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
                    <NavBar />
					<Views />
				</>
			</Authorized>

		} />

		<Route path="print/:puzzleId" element={<PrintScreen />} />
	</Routes>
}