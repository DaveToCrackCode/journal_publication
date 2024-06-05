import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import toast from 'react-hot-toast'; 
import { Navigate } from 'react-router-dom';

const Navvar = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  // get user
  const [user, setUser] = useState(
    localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))
      : ""
  );
  //const { userInfo } = useSelector((state) => state.root);
  const isLoggedIn = token ==="" ? false:true;
  const isAdmin = user && user.isAdmin;
 //console.log(isLoggedIn);
  const handleLogout = () => {
    localStorage.removeItem("token");;
    setToken("");
    setUser('');
    toast.success("User Logout SuccessFully");
    //navigate('/');
  };
  


  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              {isLoggedIn && !isAdmin && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/submit_paper">
                      Submit Paper
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/all-submit-paper">
                      All Submit paper
                    </Link>
                  </li>
                </>
              )}

              {isLoggedIn && isAdmin && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/all-journal">
                      All Journal
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/list-of-reviewer">
                      List Of Reviewer
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/profile">
                      Profile
                    </Link>
                  </li>
                 
                </>
              )}

              
              
              { isLoggedIn &&(
                <li className="nav-item">
                <button className="btn btn-link nav-link mx-2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
              )

              }

              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/">
                      Home
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navvar;
