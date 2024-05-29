import './App.css';
import Navbar from './components/Nav';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './Home';
// import Register from './components/Register';
import AddData from './components/AddData';
import AddHotDeal from './components/addHotDeal';
import RemovePkg from './components/RemovePkg';
import RemovehotDeal from './components/RemoveHotDeal';
import UserManagement from './components/UserManagement';
// import Payment from '../../wanderluxe-react-ui/src/components/Payment';
function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/home/:uid" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/addData" element={<AddData />}></Route>
          <Route exact path="/addHotDeals" element={<AddHotDeal />}></Route>
          <Route exact path="/removePKG" element={<RemovePkg />}></Route>
          <Route exact path="/removeHD" element={<RemovehotDeal />}></Route>
          <Route exact path="/userManagement" element={<UserManagement />}></Route>
          {/* <Route exact path="/payMent" element={<Payment />}></Route> */}
          <Route path="*" element={<Navigate replace to="/" />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
