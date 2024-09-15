import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlice";
import "../style/home.css";
import myImage from "../assets/images/image 4.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    setShowConfirmation(!showConfirmation);
  };

  const confirmLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <div className="nav">
        {/* <button onClick={handleLogout} >Logout</button> */}
        <svg
          width="45"
          height="45"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          <path
            d="M22.5 3.75C12.1444 3.75 3.75 12.1444 3.75 22.5C3.75 32.8556 12.1444 41.25 22.5 41.25C32.8556 41.25 41.25 32.8556 41.25 22.5C41.25 12.1444 32.8556 3.75 22.5 3.75Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.00812 34.3988C8.00812 34.3988 12.1875 29.0625 22.5 29.0625C32.8125 29.0625 36.9937 34.3988 36.9937 34.3988M22.5 22.5C23.9918 22.5 25.4226 21.9074 26.4775 20.8525C27.5324 19.7976 28.125 18.3668 28.125 16.875C28.125 15.3832 27.5324 13.9524 26.4775 12.8975C25.4226 11.8426 23.9918 11.25 22.5 11.25C21.0082 11.25 19.5774 11.8426 18.5225 12.8975C17.4676 13.9524 16.875 15.3832 16.875 16.875C16.875 18.3668 17.4676 19.7976 18.5225 20.8525C19.5774 21.9074 21.0082 22.5 22.5 22.5Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="imgs">
        <img src={myImage} alt="" className="logo" />
        <p>Welcome to Digitalflake admin</p>
      </div>

      {showConfirmation && (
        <div className="confirmation-dialog">
        
          <div className="flex gap-5">
            <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_276_4)">
                <path
                  d="M24.9356 5.90247L41.1244 33.9412C41.3712 34.3688 41.5012 34.8538 41.5012 35.3474C41.5012 35.8411 41.3713 36.3261 41.1244 36.7537C40.8776 37.1812 40.5225 37.5363 40.095 37.7831C39.6675 38.03 39.1825 38.16 38.6888 38.16H6.31127C5.81758 38.16 5.33259 38.03 4.90504 37.7831C4.4775 37.5363 4.12247 37.1812 3.87563 36.7537C3.62879 36.3261 3.49884 35.8411 3.49884 35.3474C3.49884 34.8538 3.6288 34.3688 3.87564 33.9412L20.0644 5.90247C21.1463 4.02747 23.8519 4.02747 24.9356 5.90247ZM22.5 28.125C22.0027 28.125 21.5258 28.3225 21.1742 28.6741C20.8226 29.0258 20.625 29.5027 20.625 30C20.625 30.4972 20.8226 30.9742 21.1742 31.3258C21.5258 31.6774 22.0027 31.875 22.5 31.875C22.9973 31.875 23.4742 31.6774 23.8258 31.3258C24.1775 30.9742 24.375 30.4972 24.375 30C24.375 29.5027 24.1775 29.0258 23.8258 28.6741C23.4742 28.3225 22.9973 28.125 22.5 28.125ZM22.5 15C22.0408 15 21.5975 15.1686 21.2543 15.4738C20.9111 15.779 20.6919 16.1995 20.6381 16.6556L20.625 16.875V24.375C20.6255 24.8529 20.8085 25.3125 21.1366 25.66C21.4647 26.0075 21.9131 26.2167 22.3901 26.2447C22.8672 26.2727 23.337 26.1175 23.7035 25.8107C24.0699 25.504 24.3055 25.0689 24.3619 24.5943L24.375 24.375V16.875C24.375 16.3777 24.1775 15.9008 23.8258 15.5491C23.4742 15.1975 22.9973 15 22.5 15Z"
                  fill="#E40613"
                />
              </g>
              <defs>
                <clipPath id="clip0_276_4">
                  <rect width="45" height="45" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p style={{ fontWeight: "bolder", fontSize: 25 }}>Log Out</p>
          </div>
          <p>Are you sure you want to log out?</p>
          <button
            style={{
              backgroundColor: "white",
              color: "gray",
              borderRadius: "25px",
            }}
            onClick={cancelLogout}
          >
            Delete
          </button>
          <button
            style={{
              backgroundColor: "#662671",
              color: "white",
              borderRadius: "25px",
            }}
            onClick={confirmLogout}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
