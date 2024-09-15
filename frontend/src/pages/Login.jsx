import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Base_Url } from '../config';
import { loginSuccess } from '../redux/slice/authSlice';
import '../style/Login.css';
import myImage from '../assets/images/image 4.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Modal component
const ForgetPasswordModal = ({ isOpen, onClose, onSubmit,loader }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email);
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2 >Did you forget password?</h2>
                <p style={{marginTop:"15px", color:"gray"}}>Enter your email address and we'll send you a link to restore password</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    <button type="submit" style={{backgroundColor : "#662671"}}>{loader ? "Sending Link..." : "Request reset link"}</button>
                <p className='ml-16 underline underline-offset-2 to-gray-300 cursor-pointer' onClick={onClose}>Back to log in</p>
                </form>
            </div>
        </div>
    );
};

const Login = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [loader, setLoader] = useState(false)

    const dispatch = useDispatch();
    const state = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post(`${Base_Url}/api/user/login`, {
                email: mobile,
                password: password,
            });
            if (response) {
                setMobile("")
                setPassword("")
                setLoading(false)
                dispatch(loginSuccess(response.data));
                navigate("/home");
            }
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data.msg);
        }
    };

    const handleForgetPassword = () => {
        setShowForgetPasswordModal(true); // Open the modal
    };

    const handleCloseForgetPasswordModal = () => {
        setShowForgetPasswordModal(false);
    };

    const handleSubmitForgetPassword = async (email) => {
        setLoader(true)
        try {
            // Handle forget password submission here
            const response = await axios.post(`${Base_Url}/api/forget/password`, {
                email: email
            })
            setLoader(false)
            toast.success(response.data.msg)
            // alert(response.data.msg)
            // You can add your logic for sending verification email or resetting password
            // handleCloseForgetPasswordModal();
        } catch (error) {
            setLoader(false)
            toast.error(error.response.data.msg)
        }
    };

    return (
        <div className='Container'>
            <div className='formContaier'>
                <form onSubmit={handleLogin} >
                    <img src={myImage} alt="My Image" className='logo' />
                    <h1>Welcome to Digitalflake admin</h1>
                    <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
                        style={{backgroundColor : "#662671"}}
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>
                    {/* {error && <p>{error}</p>} */}
                    <p onClick={handleForgetPassword} style={{cursor:"pointer"}}>Forgot password?</p>
                </form>
            </div>
            {showForgetPasswordModal && <ForgetPasswordModal
                isOpen={showForgetPasswordModal}
                onClose={handleCloseForgetPasswordModal}
                onSubmit={handleSubmitForgetPassword}
                loader={loader}
            />}

        <ToastContainer />
        </div>
    );
};

export default Login;
