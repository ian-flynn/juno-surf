import React from 'react';
import logo from '../images/JunoSurfLogo.png';

const NavBar = () => {
  return (
    <div id='navbar'>
      <header></header>
      {/* <nav>
        <button type="button" aria-controls="navigation-drawer" aria-expanded="false"></button>
        <ul id="navigation-drawer">
          {/* <li><a>Home</a></li> */}
      {/* <li><a>Log in / Log out</a></li> */}
      {/* </ul> */}
      {/* // </nav> */}
      <img id='logo' src={logo} alt='Juno Surf' />
    </div>
  );
};

export default NavBar;
