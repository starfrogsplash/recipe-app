import React from 'react'

import {NavLink} from 'react-router-dom'

const Navbar = () => (

  <div className="nav">
    <ul>
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/search">Search</NavLink>
      </li>
      <li>
        <NavLink to="/recipes/add">Add Recipe</NavLink>
      </li>
    </ul>
        <style jsx>{`
            .nav {
              text-align: center;
              margin-bottom: 1em;
              padding-bottom: 0.2em;
              padding-top: 2em;
              background-color: #efefef;
              box-shadow: -3px 3px 10px 0px rgba(168, 168, 168, 0.7);
            }

            nav ul {
              display: flex;
              align-items: center;
              justify-content: space-evenly;
              flex-wrap: wrap;
            }

            `}</style>
    </div>
  );


export default Navbar



