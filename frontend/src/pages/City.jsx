import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_Url } from '../config';
import { useDispatch, useSelector } from 'react-redux';
import "../style/State.css";
import city from "../assets/images/skyline.png";


const City = () => {
  const [data, setData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [newCityName, setNewCityName] = useState('');
  const [newCityCode, setNewCityCode] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newCity, setNewCity] = useState({
    CityName: '',
    CityCode: '',
    status: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [newState, setnewState] = useState('')
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.user?.accessToken);

  useEffect(() => {
    getCity();
  }, []);

  const getCity = async () => {
    try {
      const response = await axios.get(`${Base_Url}/api/get/city`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (city) => {
    setSelectedCity(city);
    setNewCityName(city.CityName);
    setNewCityCode(city.CityCode);
    setNewStatus(city.status);
    setShowEditModal(true);
  };

  const handleDelete = (city) => {
    setSelectedCity(city);
    setShowDeleteModal(true);
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleAddSave = async () => {
    try {
      await axios.post(`${Base_Url}/api/post/city`, newCity, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      getCity();
      setShowAddModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.patch(
        `${Base_Url}/api/update/city/${selectedCity._id}`,
        {
          CityName: newCityName,
          CityCode: newCityCode,
          status: newStatus,
          state: newState
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        }
      );
      getCity();
      setShowEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `${Base_Url}/api/delete/city/${selectedCity._id}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      getCity();
      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter data based on search term
  const filteredData = data.filter(city =>
    city.CityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.CityCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="flex justify-between ">
        <div className="flex gap-6 justify-center align-center mb-4">
          <img src={city} alt="city" width={"60px"} height={"30px"}/>
          <h1 className="text-3xl font-bold">City</h1>
          <input
            type="text"
            placeholder=""
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{width:"800px"}}
          />
        </div>
        <div>
          <button onClick={handleAdd} style={{backgroundColor:"#662671",color:"white",borderRadius:"25px",padding:"8px 15px"}} >Add New</button>
        </div>
      </div>

      <table className="table">
  <thead>
    <tr>
      <th>ID</th>
      <th>City Name</th>
      <th>City Code</th>
      <th>State Name</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredData.map((city, index) => (
      <tr key={city._id}>
        <td>{index + 1}</td> {/* Adding the ID column */}
        <td>{city.CityName}</td>
        <td>{city.CityCode}</td>
        <td>{city.state}</td>
        <td>{city.status}</td>
        <td className="flex gap-4">
          <button onClick={() => handleEdit(city)}>
            {/* SVG for Edit */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.99998H5C4.46957 2.99998 3.96086 3.2107 3.58579 3.58577C3.21071 3.96084 3 4.46955 3 4.99998V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V12"
                stroke="#8F8F8F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.375 2.62498C18.7728 2.22716 19.3124 2.00366 19.875 2.00366C20.4376 2.00366 20.9772 2.22716 21.375 2.62498C21.7728 3.02281 21.9963 3.56237 21.9963 4.12498C21.9963 4.68759 21.7728 5.22716 21.375 5.62498L12 15L8 16L9 12L18.375 2.62498Z"
                stroke="#8F8F8F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button onClick={() => handleDelete(city)}>
            {/* SVG for Delete */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9548 0L13.3236 0.006C14.2572 0.1188 15.0756 0.558 15.75 1.2996C16.3008 1.9044 16.59 2.6076 16.6068 3.3732H23.1768C23.3962 3.37447 23.6061 3.46276 23.7604 3.61868C23.9148 3.7746 24.0009 3.98541 24 4.2048C24.0005 4.31338 23.9795 4.42098 23.9384 4.52148C23.8973 4.62197 23.8368 4.71338 23.7604 4.79049C23.6839 4.8676 23.5931 4.9289 23.4929 4.97089C23.3928 5.01288 23.2854 5.03473 23.1768 5.0352L20.9736 5.034V18.9864C20.9736 22.038 19.8348 24 17.3244 24H6.5028C3.9924 24 2.8716 22.0488 2.8716 18.9864V5.034H0.823201C0.604336 5.03305 0.394779 4.94535 0.240467 4.79014C0.0861554 4.63493 -0.000318849 4.42487 8.83491e-07 4.206C8.83491e-07 3.7464 0.368401 3.3756 0.823201 3.3756H7.3872C7.404 2.7588 7.6332 2.1336 8.052 1.5156C8.676 0.594 9.6504 0.0888 10.9548 0ZM19.3272 5.034H4.5168V18.9864C4.5168 21.252 5.1408 22.3392 6.5028 22.3392H17.3244C18.6912 22.3392 19.3284 21.2424 19.3284 18.9864L19.3272 5.034ZM8.0592 7.608C8.5128 7.608 8.8812 7.98 8.8812 8.4384V18.0984C8.88167 18.207 8.86075 18.3146 8.81964 18.4151C8.77853 18.5156 8.71802 18.607 8.64158 18.6841C8.56514 18.7612 8.47426 18.8225 8.37413 18.8645C8.274 18.9065 8.16658 18.9283 8.058 18.9288C7.83893 18.9275 7.62931 18.8394 7.47519 18.6837C7.32107 18.528 7.23504 18.3175 7.236 18.0984V8.4384C7.236 7.98 7.6056 7.608 8.0592 7.608ZM11.3292 7.608C11.7852 7.608 12.1524 7.98 12.1524 8.4384V18.0984C12.1529 18.207 12.132 18.3146 12.0908 18.4151C12.0497 18.5156 11.9892 18.607 11.9128 18.6841C11.8363 18.7612 11.7455 18.8225 11.6453 18.8645C11.5452 18.9065 11.4378 18.9283 11.3292 18.9288C11.1101 18.9275 10.9005 18.8394 10.7464 18.6837C10.5923 18.528 10.5062 18.3175 10.5072 18.0984V8.4384C10.5072 7.98 10.8756 7.608 11.3292 7.608ZM14.6028 7.608C15.0564 7.608 15.4248 7.98 15.4248 8.4384V18.0984C15.4258 18.3175 15.3397 18.528 15.1856 18.6837C15.0315 18.8394 14.8219 18.9275 14.6028 18.9288C14.4942 18.9283 14.3868 18.9065 14.2867 18.8645C14.1865 18.8225 14.0957 18.7612 14.0192 18.6841C13.9428 18.607 13.8823 18.5156 13.8412 18.4151C13.8 18.3146 13.7791 18.207 13.7796 18.0984V8.4384C13.7796 7.98 14.148 7.608 14.6028 7.608Z"
                fill="#FF4848"
              />
            </svg>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      {showAddModal && (
        <div className="modal-container">
          <div className="modal">
            <span className="close" onClick={() => setShowAddModal(false)}>&times;</span>
            <h2>Add City</h2>
            <label>City Name:</label>
            <input type="text" value={newCity.CityName} onChange={(e) => setNewCity({ ...newCity, CityName: e.target.value })} />
            <label>City Code:</label>
            <input type="text" value={newCity.CityCode} onChange={(e) => setNewCity({ ...newCity, CityCode: e.target.value })} />
            <label>Status:</label>
            <input type="text" value={newCity.status} onChange={(e) => setNewCity({ ...newCity, status: e.target.value })} />
            <button style={{backgroundColor:"white", color:"gray"}} onClick={() => setShowAddModal(false)}>Cancel</button>
            <button style={{backgroundColor:"#662671", color:"white", borderRadius:"25px"}} onClick={handleAddSave}>Save</button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-container">
          <div className="modal">
            <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
            <h2>Edit City</h2>
            <label>City Name:</label>
            <input type="text" value={newCityName} onChange={(e) => setNewCityName(e.target.value)} />
            <label>City Code:</label>
            <input type="text" value={newCityCode} onChange={(e) => setNewCityCode(e.target.value)} />

            <label>State:</label>
            <input type="text" value={newState} onChange={(e) => setnewState(e.target.value)} />
            <label>Status:</label>
            <input type="text" value={newStatus} onChange={(e) => setNewStatus(e.target.value)} />
            <button style={{backgroundColor:"white", color:"gray"}} onClick={() => setShowEditModal(false)}>Cancel</button>
            <button style={{backgroundColor:"#662671", color:"white", borderRadius:"25px"}} onClick={handleEditSave}>Save</button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-container">
          <div className="modal">
            <span className="close" onClick={() => setShowDeleteModal(false)}>&times;</span>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this city?</p>
            <button style={{backgroundColor:"#662671", color:"white", borderRadius:"25px"}} onClick={handleDeleteConfirm}>Delete</button>
            <button style={{backgroundColor:"white", color:"gray"}} onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default City;
