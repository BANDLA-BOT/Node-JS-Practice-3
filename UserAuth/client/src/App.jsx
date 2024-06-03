import { Route, Routes, Navigate } from "react-router-dom";
import Main from './components/Main/index'
import SignUp from './components/SignUp/index'
import Login from './components/Login/index'

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<SignUp />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;