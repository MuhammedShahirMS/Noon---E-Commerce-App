import NavBar from './components/NavBar';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useEffect } from 'react';
import { userActions } from './Redux/user-slice';
import { useDispatch } from 'react-redux';
import  Home  from './pages/Home';
import  Product  from './pages/Product';
import  Auth  from './pages/Auth';
import Cart from './Cart/Cart';
import CategoryItems from './pages/CategoryItems';
import './App.css';

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
  const listen = onAuthStateChanged(auth, (user) => {
  if(user) {
    const expiresBy = localStorage.getItem('expiresAt');
    const remainingTime = new Date(expiresBy).getTime() - new Date().getTime();
    dispatch(userActions.toggleAuthStatus({isLoggedIn: true,
      emailId: user.email,
    })); 
    navigate('/Auth', {state: {isRefreshed: true,
                               timeLeft  : remainingTime
                              }})
           }
      
  })

    return () => {
      listen();
    }
  }, [])
  
  return (
    <>
    <NavBar/>
    <Routes>
    <Route path='/*' element = {<Navigate to = '/Home'/>} />
    <Route path='/Home' element = {<Home/>} />
    <Route path='/Product/:productId' element = {<Product/>} />
    <Route path='/Auth' element={<Auth/>}/>
    <Route path = '/Category' element={<CategoryItems/>}/>
    </Routes>
    <Cart/>
    </>
    
  )
}

export default App
