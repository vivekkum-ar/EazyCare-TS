import React, { useContext } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import DoctorsList from './pages/Admin/DoctorsList';
import AddDoctor from './pages/Admin/AddDoctor';
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { DoctorContext } from './context/doctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {
const {aToken} = useContext(AdminContext);
const {dToken} = useContext(DoctorContext);


  return aToken || dToken ? (
    <div className="bg-[#f8f9fd]">
      <Navbar></Navbar>
      <ToastContainer></ToastContainer>
      <div className="flex item-start">
        <Sidebar></Sidebar>
        <Routes>
          {/* /* ---------------------------------------- Admin Routes ----------------------------------------  */}
          <Route path='/' element={<></>}></Route>
          {/* <Route path='/login' element={<Login></Login>}></Route> */}
          <Route path='/admin-dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/all-appointments' element={<AllAppointments />}></Route>
          <Route path='/add-doctor' element={<AddDoctor />}></Route>
          <Route path='/doctor-list' element={<DoctorsList />}></Route>

          {/* /* ---------------------------------------- Doctor Routes ---------------------------------------  */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard />}></Route>
          <Route path='/doctor-appointments' element={<DoctorAppointments />}></Route>
          <Route path='/doctor-profile' element={<DoctorProfile />}></Route>

        </Routes>
      </div>
    </div>
    ) : (
      <>
      <Login></Login>
      <ToastContainer></ToastContainer>
    </>
    )
}

export default App