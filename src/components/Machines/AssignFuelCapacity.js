import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../constants/Url';
import { useGlobalState } from '../constants/GlobalStateProvider';

function AssignFuelCapacity() {
  const [machineIds, setMachineIds] = useState([]);
  const [machineCount, setMachineCount] = useState(0);
  const [fuelCapacities, setFuelCapacities] = useState({});
  const [machineNames, setMachineNames] = useState({});
  const [locationNames, setLocationNames] = useState({});
  const location = useLocation();
  const { getGlobal, setGlobal } = useGlobalState();
  const globalState = getGlobal();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (globalState) {
      fetchMachineInfo(globalState);
    }
  }, [location]);

  const fetchMachineInfo = async (globalState) => {
    try {
      const response = await axios.get(`${API_URL}/machines/user/${globalState}`);
      const data = response.data;

      if (data.success) {
        setMachineIds(data.machine_ids);
        setMachineCount(data.machine_count);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleInputChange = (event, machineId, field) => {
    const { value } = event.target;
    if (field === 'fuel_capacity') {
      setFuelCapacities(prevState => ({
        ...prevState,
        [machineId]: value,
      }));
    } else if (field === 'machine_name') {
      setMachineNames(prevState => ({
        ...prevState,
        [machineId]: value,
      }));
    } else if (field === 'location_name') {
      setLocationNames(prevState => ({
        ...prevState,
        [machineId]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataToSubmit = {
      user_id: globalState, // Assuming globalState is set with user_id
      fuel_capacities: machineIds.map(machineId => ({
        machine_id: machineId,
        fuel_capacity: fuelCapacities[machineId] || 0, // Ensure there's a default value if not filled
        machine_name: machineNames[machineId] || '', // Ensure there's a default value if not filled
        location_name: locationNames[machineId] || '', // Ensure there's a default value if not filled
      }))
    };

    try {
      const response = await axios.post(`${API_URL}/machines/assign_fuel_capacity`, dataToSubmit);
      if (response.data.success) {
        alert('Fuel capacities updated successfully');
      } else {
        alert('Failed to update fuel capacities');
      }
    } catch (error) {
      console.error('Error updating fuel capacities:', error);
    }
  };

  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center py-4">
                <div className="card w-100">
                  <div className="card-body">
                    <h1 className="card-title text-center mb-4">Assign Fuel Capacity to Machines</h1>
                    <form onSubmit={handleSubmit}>
                      {machineIds.map((machineId, index) => (
                        <div className="form-group mb-3" key={index}>
                          <label style={{ fontWeight: 'bold' }}>
                            Machine ID: {machineId}
                          </label>
                          <input
                            type="number"
                            className="form-control mt-2"
                            placeholder="Enter fuel capacity"
                            value={fuelCapacities[machineId] || ''}
                            onChange={(event) => handleInputChange(event, machineId, 'fuel_capacity')}
                          />
                          <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Enter machine name"
                            value={machineNames[machineId] || ''}
                            onChange={(event) => handleInputChange(event, machineId, 'machine_name')}
                          />
                          <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Enter location name"
                            value={locationNames[machineId] || ''}
                            onChange={(event) => handleInputChange(event, machineId, 'location_name')}
                          />
                        </div>
                      ))}
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AssignFuelCapacity;
