import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_Url } from '../config';
import { useDispatch, useSelector } from 'react-redux';
import "../style/State.css";
import warehouse from "../assets/images/warehouse.png";

const Warehouse = () => {
  const [data, setData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [newWarehouseName, setNewWarehouseName] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newState, setNewState] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newWarehouse, setNewWarehouse] = useState({
    name: '',
    status: '',
    state: '',
    city: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteWarehouseId, setDeleteWarehouseId] = useState(null);
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.user?.accessToken);

  useEffect(() => {
    getWarehouse();
  }, []);

  const getWarehouse = async () => {
    try {
      const response = await axios.get(`${Base_Url}/api/get/wearHouse`, {
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

  const handleEdit = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setNewWarehouseName(warehouse.name);
    setNewStatus(warehouse.status);
    setNewState(warehouse.state);
    setNewCity(warehouse.city);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleAddSave = async () => {
    try {
      await axios.post(`${Base_Url}/api/post/wearHouse`, newWarehouse, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      getWarehouse();
      setShowAddModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSave = async () => {
    try {
      await axios.patch(
        `${Base_Url}/api/update/wearHouse/${selectedWarehouse._id}`,
        {
          name: newWarehouseName,
          status: newStatus,
          city: newCity,
          state: newState,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        }
      );
      getWarehouse();
      setShowEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (warehouseId) => {
    setDeleteWarehouseId(warehouseId);
    setShowDeleteConfirmModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${Base_Url}/api/delete/wearHouse/${deleteWarehouseId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      getWarehouse();
      setShowDeleteConfirmModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmModal(false);
  };

  // Filter data based on search term
  const filteredData = data.filter(warehouse =>
    warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="flex justify-between">
        <div className="flex gap-6 justify-center align-center mb-4">
          <img src={warehouse} alt="warehouse" width={"60px"} height={"30px"} />
          <h1 className="text-3xl font-bold">Warehouse</h1>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "800px" }}
          />
        </div>
        <div>
          <button onClick={handleAdd} style={{ backgroundColor: "#662671", color: "white", borderRadius: "25px", padding: "8px 5px" }}>Add New</button>
        </div>
      </div>

      <table className="table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Status</th>
      <th>State</th>
      <th>City</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredData.map((warehouse, index) => (
      <tr key={warehouse._id}>
        <td>{index + 1}</td> {/* ID column starts from 1 */}
        <td>{warehouse.name}</td>
        <td style={{ color: warehouse.status === 'inactive' ? 'red' : 'green' }}>{warehouse.status}</td>
        <td>{warehouse.state}</td>
        <td>{warehouse.city}</td>
        <td className='flex gap-4'>
          <button onClick={() => handleEdit(warehouse)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.99998H5C4.46957 2.99998 3.96086 3.2107 3.58579 3.58577C3.21071 3.96084 3 4.46955 3 4.99998V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V12" stroke="#8F8F8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.375 2.62498C18.7728 2.22716 19.3124 2.00366 19.875 2.00366C20.4376 2.00366 20.9772 2.22716 21.375 2.62498C21.7728 3.02281 21.9963 3.56237 21.9963 4.12498C21.9963 4.68759 21.7728 5.22716 21.375 5.62498L12 15L8 16L9 12L18.375 2.62498Z" stroke="#8F8F8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button onClick={() => handleDeleteClick(warehouse._id)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H5H21" stroke="#8F8F8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#8F8F8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      {/* Add Warehouse Modal */}
      {showAddModal && (
        <div className="modal-container">
          <div className="modal">
            <span className="close" onClick={() => setShowAddModal(false)}>&times;</span>
            <h2>Add Warehouse</h2>
            <label>Name:</label>
            <input
              type="text"
              value={newWarehouse.name}
              onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
            />
            <label>Status:</label>
            <input
              type="text"
              value={newWarehouse.status}
              onChange={(e) => setNewWarehouse({ ...newWarehouse, status: e.target.value })}
            />
            <label>State:</label>
            <input
              type="text"
              value={newWarehouse.state}
              onChange={(e) => setNewWarehouse({ ...newWarehouse, state: e.target.value })}
            />
            <label>City:</label>
            <input
              type="text"
              value={newWarehouse.city}
              onChange={(e) => setNewWarehouse({ ...newWarehouse, city: e.target.value })}
            />
            <button
              style={{ backgroundColor: "#662671", color: "white", borderRadius: "25px", padding: "8px 15px" }}
              onClick={handleAddSave}
            >
              Save
            </button>
            <button
              style={{ backgroundColor: "white", color: "black", borderRadius: "25px", padding: "8px 15px", marginLeft: "10px" }}
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Edit Warehouse Modal */}
      {showEditModal && (
        <div className="modal-container">
          <div className="modal">
            <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
            <h2>Edit Warehouse</h2>
            <label>Name:</label>
            <input
              type="text"
              value={newWarehouseName}
              onChange={(e) => setNewWarehouseName(e.target.value)}
            />
            <label>Status:</label>
            <input
              type="text"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            />
            <label>State:</label>
            <input
              type="text"
              value={newState}
              onChange={(e) => setNewState(e.target.value)}
            />
            <label>City:</label>
            <input
              type="text"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
            />
            <button
              style={{ backgroundColor: "#662671", color: "white", borderRadius: "25px", padding: "8px 15px" }}
              onClick={handleEditSave}
            >
              Save
            </button>
            <button
              style={{ backgroundColor: "white", color: "black", borderRadius: "25px", padding: "8px 15px", marginLeft: "10px" }}
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div className="modal-container">
          <div className="modal">
            <span className="close" onClick={() => setShowDeleteConfirmModal(false)}>&times;</span>
            <h2>Are you sure you want to delete this warehouse?</h2>
            <button
              style={{ backgroundColor: "#662671", color: "white", borderRadius: "25px", padding: "8px 15px" }}
              onClick={handleDeleteConfirm}
            >
              Confirm
            </button>
            <button
              style={{ backgroundColor: "white", color: "black", borderRadius: "25px", padding: "8px 15px", marginLeft: "10px" }}
              onClick={handleDeleteCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouse;
