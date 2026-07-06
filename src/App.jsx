import Homepage from './pages/Homepage';
import Feature from './components/home/components/Feature';
import Modal from './components/ui/Modal';
import CTA from './components/home/components/CTA';
import Footer from './components/Footer';
import CustomerPage from './pages/CustomerPage/CustomerPage';
import CustomerQueuePage from './pages/CustomerPage/CustomerQueuePage';
import {
	Routes,
	Route
} from "react-router-dom";
import LogOutModal from './components/LogOutModal';
import CustomerNavbar from './components/features/customer/CustomerNavbar';
import CustomerViewDetailPage from './pages/CustomerPage/CustomerViewDetailPage';
import OwnerPage from './pages/OwnerPage/OwnerPage';
import ServicePage from './pages/OwnerPage/ServicePage';
import OwnerSettingsUI from './components/features/Owner/OwnerSettingsUI';
import OwnerSettingsPage from './pages/OwnerPage/OwnerSettingPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';



function App() {
	return (


		<Routes>
			<Route path='/' element={<Homepage></Homepage>}></Route>

			{/* customer */}
			<Route path='/customer' element={<CustomerPage></CustomerPage>}></Route>
			<Route path='/customer/my-queue' element={<CustomerQueuePage></CustomerQueuePage>}></Route>
			<Route path='/customer/salon' element={<CustomerViewDetailPage></CustomerViewDetailPage>}></Route>

			<Route path='/owner/path' element={<OwnerPage></OwnerPage>}></Route>
			<Route path='/owner/service' element={<ServicePage></ServicePage>}></Route>
			<Route path='/owner/services' element={<ServicePage></ServicePage>}></Route>
			<Route path='/owner/settings' element={<OwnerSettingsPage></OwnerSettingsPage>}></Route>

			{/* AUTH */}
			<Route path='/login' element={<LoginPage></LoginPage>}></Route>
			<Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
		</Routes>

	)
}

export default App
