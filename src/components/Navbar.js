import React from 'react';
import { NavLink } from 'react-router-dom';
import '../components/Navbar.css';

class Navbar extends React.Component {
  render() {
    return (
      <div>   
        <div className='everything'>
          <nav className="navbar">
            <div className="navbar-content">
              {/* <img src={logo} className="logo" alt='logo' /> */}

              <ul>
                <li>
                  <NavLink exact to="/introduction" activeClassName="active">
                    Introduction
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="/template" activeClassName="active">
                    Template
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="/results" activeClassName="active">
                    Results
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Navbar;
