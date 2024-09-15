import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <ul className="flex justify-start space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
        </li>
        <li>
          <Link to="/about" className="text-white hover:text-gray-300">About</Link>
        </li>
        <li>
          <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
