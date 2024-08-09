import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MovieDetails from './components/MovieDetails';
import Login from './Pages/Login';

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/movies' element={<Home />} />
        <Route path='/movies/:id' element={<MovieDetails/>} />
      </Routes>
    </>
  );
}

export default App;
