import Homepage from './pages/Homepage';
import CustomerPage from './pages/CustomerPage/CustomerPage';
import CustomerQueuePage from './pages/CustomerPage/CustomerQueuePage';
import {
	Routes,
	Route
} from "react-router-dom";
import CustomerViewDetailPage from './pages/CustomerPage/CustomerViewDetailPage';
import OwnerPage from './pages/OwnerPage/OwnerPage';
import ServicePage from './pages/OwnerPage/ServicePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import ShopSettings from './pages/OwnerPage/ShopSettings';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import StaffDashboardPage from './staff/pages/StaffDashboardPage';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Homepage></Homepage>}></Route>

			{/* customer */}
			<Route path='/customer' element={<ProtectedRoute><CustomerPage></CustomerPage></ProtectedRoute>}></Route>
			<Route path='/customer/my-queue' element={<ProtectedRoute><CustomerQueuePage></CustomerQueuePage></ProtectedRoute>}></Route>
			<Route path='/customer/salon' element={<ProtectedRoute><CustomerViewDetailPage></CustomerViewDetailPage></ProtectedRoute>}></Route>

			<Route path='/owner/path' element={<ProtectedRoute><OwnerPage></OwnerPage></ProtectedRoute>}></Route>
			<Route path='/owner/service' element={<ProtectedRoute><ServicePage></ServicePage></ProtectedRoute>}></Route>
			<Route path='/owner/services' element={<ProtectedRoute><ServicePage></ServicePage></ProtectedRoute>}></Route>
			<Route path='/owner/settings' element={<ProtectedRoute><ShopSettings></ShopSettings></ProtectedRoute>}></Route>

			{/* staff */}
			<Route path='/staff/dashboard' element={<RoleProtectedRoute allowedRoles={['staff', 'owner']}><StaffDashboardPage /></RoleProtectedRoute>}></Route>

			{/* AUTH */}
			<Route path='/login' element={<LoginPage></LoginPage>}></Route>
			<Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
		</Routes>
	)
}

export default App
