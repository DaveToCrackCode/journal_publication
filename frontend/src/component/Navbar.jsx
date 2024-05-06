import React,{useEffect, useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import '../style//navbar.css';
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import CloseIcon from '../img/icon/close-icon.png'; // Import your close icon SVG file
import MenuIcon from '../img/icon/menu-icon.png'; // Import your menu icon SVG file

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const handleNavItemClick = () => {
    setIsMenuOpen(false); // Close the menu when a navigation link is clicked
  };

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  // get user
  const [user, setUser] = useState(
    localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))
      : ""
  );
  const isLoggedIn = token =="" ? false:true;
  const isAdmin = user && user.isAdmin;
  const  isReviewer = user && user.isReviewer;
  //console.log(user);
  const handleLogout = () => {
    localStorage.removeItem("token");;
    setToken("");
    setUser('');
    
  };
  useEffect(()=>{
    console.log("hhh");
  },[token,user]);

  return (
    <header className="header">
      <Link to='/'>
        <img className="logo" alt="ijesacbt" src={logo} />
      </Link>
      <nav className={`main-nav ${isMenuOpen ? 'menu-open' : ''}`}>
        <ul className="main-nav-list">
        {isLoggedIn && (
                 <>
                  <li><Link className="main-nav-link" to="/" onClick={handleNavItemClick}>Home</Link></li>
                  <li><Link className="main-nav-link" to="/submit_paper" onClick={handleNavItemClick}>Submit Paper</Link></li>
                  <li><Link className="main-nav-link" to="/profile" onClick={handleNavItemClick}>Profile</Link></li>
                  <li className="nav-item">
                    <Link className="main-nav-link"  onClick={handleNavItemClick}to="/all-submit-paper">
                      Your Papers
                    </Link>
                  </li>

          {isAdmin && (
                    <>
                      <li><Link className="main-nav-link" to="/all-journal" onClick={handleNavItemClick}>All Paper</Link></li>
                      <li><Link className="main-nav-link" to="/list-of-reviewer" onClick={handleNavItemClick}>List of Reviewer</Link></li>
                    </>
                  )}
                  {isReviewer && (
                    <>
                      <li><Link className="main-nav-link" to="/all-journal-for-reviewing" onClick={handleNavItemClick}>Review Papers</Link></li>
                      {/* <li><Link className="main-nav-link" to="/list-of-reviewer" onClick={handleNavItemClick}>List of Reviewer</Link></li> */}
                    </>
                  )}
                  
                  <li className="nav-item">
                  <Link className="main-nav-link" to="/" onClick={handleLogout}>Logout</Link>
                    {/* <button className="main-nav-link" style={{padding: "30%" ,fontSize: '15px' }} onClick={handleLogout}>
                      Logout
                    </button> */}
                  </li>
                  
                </>
              )}
              
              {!isLoggedIn && (
                <>
                  <li><Link className="main-nav-link" to="/signup" onClick={handleNavItemClick}>Signup</Link></li>
                  <li><Link className="main-nav-link" to="/login" onClick={handleNavItemClick}>Login</Link></li>
                  <li><Link className="main-nav-link" to="/" onClick={handleNavItemClick}>Home</Link></li>
                </>
              )}
            </ul>
          
        
      </nav>

                   
         
      <button type="button" className="btn-mobile-nav" onClick={handleToggleMenu}>
        <img className="icon-mobile-nav" src={isMenuOpen ? CloseIcon : MenuIcon} alt={isMenuOpen ? "Close Menu" : "Open Menu"} />
      </button>
    </header>

  );
};

export default Navbar;