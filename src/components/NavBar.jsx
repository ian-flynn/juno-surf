import React, { useState } from 'react';
import logo from '../images/JunoSurfLogo.png';
import Login from './Login.jsx';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div id='navbar'>
      <img id='logo' src={logo} alt='Juno Surf' />
      <button onClick={() => setMenuOpen(!menuOpen)}>Login</button>
      <Login menuOpen={menuOpen} />
    </div>
  );
};

export default NavBar;
