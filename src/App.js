import './App.css';
import {Routes , Route , Navigate , useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Movies from './Movies';
import Login from './Login';
import Register from './Register';
import Notfound from './Notfound';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import MovieDetails from './MovieDetails';


function App() {
  let navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  function saveUserData(){
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
    console.log(decodedToken);
};

function logOut(){
  setUserData(null);
  localStorage.removeItem('userToken');
  navigate('/login');
}


useEffect(()=>{
  if(localStorage.getItem('userToken')){
    saveUserData();
  }
} , []); 


function ProtectedRoute(props) {
  if(localStorage.getItem('userToken') == null)
  {
    // navigate to login
    return < Navigate to='/login' />
  }
  else{
    return props.children; 
  }
}


  return (<>
    <Navbar logOut={logOut} userData={userData}/> 
    <div className="container">
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path='home' element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path='movies' element={<ProtectedRoute><Movies/></ProtectedRoute>} />
        <Route path='moviedetails' element={<ProtectedRoute><MovieDetails/></ProtectedRoute> } >
          <Route path=':id' element={<ProtectedRoute><MovieDetails/></ProtectedRoute> } />
        </Route>
        <Route path='login' element={<Login saveUserData={saveUserData}/> } />
        <Route path='register' element={<Register/>} />
        <Route path='*' element={<Notfound/>} />
      </Routes>
      </div>
    <Footer/>
    </>
  );
}

export default App;