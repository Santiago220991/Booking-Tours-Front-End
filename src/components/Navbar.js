import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../redux/user/user';
import { deleteUserApi } from '../redux/user/userAPI';
import logo from '../Tourify.png';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const activeLink = ({ isActive }) => `nav-link${(isActive ? ' activated' : '')}`;
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };

  useEffect(() => {
  }, [user]);

  const closeMenu = () => {
    setNavbarOpen(true);
  };

  const signOut = () => {
    dispatch(removeUser());
  };

  const deleteAccount = () => {
    dispatch(deleteUserApi(user[0].user.user_id, user[0].token));
  };

  return (
    <nav>
      <div className="btn-container">
        { navbarOpen
          ? <button className="menu-btn" onClick={handleToggle} type="button">&#9776;</button> : <button className="menu-btn" onClick={handleToggle} type="button">&#9747;</button>}
      </div>
      <div className={`logo-container ${navbarOpen ? ' closeMenu' : ''}`}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={`nav-links ${navbarOpen ? ' closeMenu' : ''}`}>
        <NavLink to="/" className="nav-link" onClick={() => closeMenu()}>Home</NavLink>
        <NavLink to="/Reservations" className={activeLink} onClick={() => closeMenu()}>My Reservations</NavLink>
        <NavLink to="/NewTour" className={activeLink} onClick={() => closeMenu()}>Create Tour</NavLink>
        <NavLink to="/ReservationsForm" className={activeLink} onClick={() => closeMenu()}>Reserve Tour</NavLink>
        <NavLink to="/DeleteTours" className={activeLink} onClick={() => closeMenu()}>Delete Tour</NavLink>
      </div>
      {user.length > 0
        ? (
          <div className={`sign-out ${navbarOpen ? ' closeMenu' : ''}`}>
            <button className="sign-out-btn" type="button" onClick={signOut}>Sign Out</button>
            <button className="sign-out-btn" type="button" onClick={deleteAccount}>Delete Account</button>
          </div>
        ) : ('')}
    </nav>
  );
};

export default Navbar;
