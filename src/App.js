import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Main from './components/Main';
import TourDetails from './components/TourDetails';
import NewTour from './components/NewTour';
import ReservationsForm from './components/ReservationsForm';
import Reservations from './components/Reservations';
import DeleteTours from './components/DeleteTours';
import { addUser } from './redux/user/user';
import './styling/Navbar.css';
import './styling/reservations.css';
import './styling/TourDetails.css';
import './styling/main.css';
import './styling/newTourForm.css';
import './styling/deleteTours.css';

const App = () => {
  const loggedUser = localStorage.getItem('user');
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedUser) {
      const bytes = CryptoJS.AES.decrypt(loggedUser, 'user');
      const originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      dispatch(addUser(originalText));
    }
  }, [loggedUser, dispatch]);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/TourDetails/:tourID" element={<TourDetails />} />
        <Route path="/NewTour" element={<NewTour />} />
        <Route path="/ReservationsForm" element={<ReservationsForm />} />
        <Route path="/Reservations" element={<Reservations />} />
        <Route path="/DeleteTours" element={<DeleteTours />} />
      </Routes>
    </div>
  );
};

export default App;
