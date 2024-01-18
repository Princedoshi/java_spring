import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Customers from './Pages/Customers';


import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />    
        <Route path='/customers' element = {<Customers/>} />
      </Routes>
    </Router>
  );
}

export default App;
