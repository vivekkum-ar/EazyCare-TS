import React, { useContext } from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';

const App = () => {
const {aToken} = useContext(AdminContext);

  return aToken ? (
    <div className="">
      <ToastContainer></ToastContainer>
    </div>
    ) : (
      <>
      <Login></Login>
      <ToastContainer></ToastContainer>
    </>
    )
}

export default App