import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShowUserProfile from './components/UserProfile/ShowUserProfile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileEdit from './components/UserProfile/ProfileEdit';
import ProfileSettings from './components/UserProfile/ProfileSettings';
import ChangePassword from './components/UserProfile/ChangePassword';
import Profile from './components/UserProfile/Profile';
import UserDash from './components/Maindash/UserDash';
import Header from './components/Header/Header';
import Dashboard from './components/Maindash/Dashboard';
import { GlobalStateProvider } from './components/constants/GlobalStateProvider';
import AllMachinesDetails from './components/Machines/AllMachinesDetails';
import IndexMachines from './components/Machines/IndexMachines';
import SpecificMachineTable from './components/Machines/SpecificMachineTable';
import AssignFuelCapacity from './components/Machines/AssignFuelCapacity';
import GenerateReport from './components/Machines/GenerateReport';
import IndexGenerateReport from './components/Machines/IndexGenerateReport';
import UserLogin from './components/UserLogin/UserLogin';
import Signup from './components/UserLogin/Signup';
import ChatHome from './components/chat/ChatHome';
import ScanOptions from './components/Scanner/ScanOptions';
import { MdCrisisAlert } from 'react-icons/md';
import MriScan from './components/Scanner/MriScan';
import ChestScan from './components/Scanner/ChestScan';
import BpRecord from './components/BloodPressure/BpRecord';
import BoneScan from './components/Scanner/BoneScan';
import BloodSugarRecord from './components/BloodSugarRecord';
import WeightAndBmi from './components/WeightAndBmi';
ReactDOM.render(
  <GlobalStateProvider>
  <React.StrictMode>
    
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path ="/login" element={<UserLogin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Profile/Overview" element={<ShowUserProfile />} />
        <Route path="/Profile/Edit" element={<ProfileEdit />} />
        <Route path="/Profile/Setting" element={<ProfileSettings />} />
        <Route path="/Profile/ChangePassword" element={<ChangePassword />} />
        <Route path="/UserDash" element={<UserDash/>} />
        <Route path="/Header" element={<Header/>} />
        <Route path="/AllMachinesDetails" element={<AllMachinesDetails/>} />
        <Route path="/IndexMachines" element={<IndexMachines/>} />
        <Route path="/machine/:machineId" element={<SpecificMachineTable />} />
        <Route path="/AssignFuelCapacity" element={<AssignFuelCapacity/>} />
        <Route path="/GenerateReport" element={<GenerateReport/>} />
        <Route path="/IndexGenerateReport" element={<IndexGenerateReport/>} />
        <Route path="/ChatHome" element={<ChatHome/>}/>
        <Route path="/MriScan" element={<MriScan/>} />
        <Route path="/ChestScan" element={<ChestScan/>} />
        <Route path="/ScanOptions" element={<ScanOptions/>}/>
        <Route path="/BpRecord" element={<BpRecord/>}/>
        <Route path="/BoneScan" element={<BoneScan/>}/>
        <Route path="/BloodSugarRecord" element={<BloodSugarRecord/>}/>
        <Route path="/WeightAndBmi" element={<WeightAndBmi/>}/>
        
        

      </Routes>
    </Router>
   
  </React.StrictMode> 
  </GlobalStateProvider>,
  document.getElementById('root')
);

reportWebVitals();