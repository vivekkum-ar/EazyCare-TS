import React, { useContext } from 'react'
import Login from './pages/login'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import DoctorsList from './pages/Admin/DoctorsList';
import AddDoctor from './pages/Admin/AddDoctor';
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';

const App = () => {
const {aToken} = useContext(AdminContext);

  return aToken ? (
    <div className="bg-[#f8f9fd]">
      <Navbar></Navbar>
      <ToastContainer></ToastContainer>
      <div className="flex item-start">
        <Sidebar></Sidebar>
        <Routes>
          <Route path='/' element={<></>}></Route>
          <Route path='/admin-dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/all-appointments' element={<AllAppointments />}></Route>
          <Route path='/add-doctor' element={<AddDoctor />}></Route>
          <Route path='/doctor-list' element={<DoctorsList />}></Route>
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