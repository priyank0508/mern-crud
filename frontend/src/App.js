import Layout from './Components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TermsAndCondition from './Pages/TermsAndConditions';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import UserDashboard from './Pages/UserDashboard';
import PrivacyAndPolicy from './Pages/PrivacyAndPolicy';
import { ToastContainer } from 'react-toastify';
import EditProfile from './Pages/EditProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
            <Route path="/" element={<Home />} />
            <Route path="/terms-condition" element={<TermsAndCondition />} />
            <Route path="/privacy-policy" element={<PrivacyAndPolicy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-update" element={<EditProfile />} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
