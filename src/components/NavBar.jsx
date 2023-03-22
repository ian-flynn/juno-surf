import React from "react";

const NavBar = () => {
  return (
    <div id='navbar'>
      <header></header>
      <nav>
        <button type="button" aria-controls="navigation-drawer" aria-expanded="false"></button>
        <ul id="navigation-drawer">
          <li><a>Home</a></li>
          <li><a>Log in / Log out</a></li>
        </ul>
      </nav>
      <h3>Juno Surf</h3>
    </div>
  )
}

export default NavBar;