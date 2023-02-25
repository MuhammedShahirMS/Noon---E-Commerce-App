import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { userActions } from "../Redux/user-slice";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import classes from './Auth.module.css';
import UserForm from "../components/UserForm";
import LoadingSpinner from "../components/LoadingSpinner";


export const Auth = () => {

    const [signupNeeded, setsignupNeeded] = useState(false);
    const[isLoading, setIsLoading]        = useState(false);
    const isLoggedIn    = useSelector(state => state.user.isAuthenticated);
    const emailIdForUse = useSelector(state => state.user.emailId)
    const navigate      = useNavigate();
    const location      = useLocation();
    const dispatch      = useDispatch();
    const usersCollectionRef = collection(db, 'users');


    const getUserData = async (emailId) => {
        setIsLoading(false);
        const usersCollectionRef = collection(db, 'users');
        const data       = await getDocs(usersCollectionRef);
        const users      = data.docs.map(docu => ({...docu.data(), id: docu.id}));
        const user       = users.filter(person => person.email === emailId);
        dispatch(userActions.setUserData({userDoc: user, userEmailId: emailId}))
    }

    const signOutHandler = () => {
        signOut(auth).then(() => {
        dispatch(userActions.toggleAuthStatus({isLoggedIn: false}));
        navigate('/Home');
        localStorage.removeItem('token');
        localStorage.removeItem('expiresBy');
        })   
    }

    useEffect(() => {
        if(location.state === 'Order Placed') {
            getUserData(emailIdForUse).then(navigate('Home'));
        }  
        if(!location.state) return;
        if(location.state.hasOwnProperty('isRefreshed')) {
            const remainingTime = location.state.timeLeft;
            setTimeout(() => {
                console.log('signing out');
                signOutHandler();
            }, remainingTime)
        navigate('/Home');
        }
       
    }, [])

    const closeHandler = () => {
        navigate('/Home');
    }
    
    const viewOrdersHandler = () => {
        navigate('/MyOrders');
    }


    const signUpNeededHandler = () => {
        setsignupNeeded(true);
        // brings signup form
    }

    const createUserDocument = async (userName, emailId) => {
            await addDoc(usersCollectionRef, {
                name   : userName,
                email  : emailId,
                orders : []
            })
         }

    const setToken = credentials => {
        localStorage.setItem('token', credentials._tokenResponse.idToken);
        const tokenDuration = credentials._tokenResponse.expiresIn;
        const expiresAt = new Date(new Date().getTime() + (+tokenDuration * 1000));
        localStorage.setItem('expiresAt', expiresAt);
        setTimeout(() => {
            signOutHandler();
        }, (+tokenDuration * 1000))
    }

    const authHandler = async(event, emailFromForm, passWordFromForm, userNameFromForm) => {
        setIsLoading(true);
        const action   = event.target.getAttribute('id');
        const email    = emailFromForm;
        const passWord = passWordFromForm;

        if (action === 'login') {
        signInWithEmailAndPassword(auth, email, passWord).then((userCred) => {
        setToken(userCred);   
        getUserData(email).then(() => {
        dispatch(userActions.toggleAuthStatus({isLoggedIn: true}));
        navigate('/Home');
        })
    
        if(!location.state) return;
        if(location.state.hasOwnProperty('notLoggedIn')) {   // to redirect to Orders page from Cart while making room for login in between.
            navigate('/Orders', {state:location.state});
        }

        }).catch(err => {
            alert(err);
        })
  
        }
        else {
        createUserWithEmailAndPassword(auth, email,  passWord).then(userCred => {
        createUserDocument(userNameFromForm, email);
        setToken(userCred);
        getUserData(email).then(() => {
        dispatch(userActions.toggleAuthStatus({isLoggedIn: true}));
        })
        }).catch(err => {
        alert(err);
        })
        }}

    const BackDrop = () => {
        return (
            <div onClick={closeHandler} className={classes.backdrop}>
                {isLoading && <LoadingSpinner/>}
            </div>
        )}   
        
    const Modal = () => {

    let content;
    if(!isLoggedIn) {
        if(!signupNeeded) content = <UserForm type = 'signIn' authHandleFn = {authHandler} signUpNeededHandleFn = 
                                                {signUpNeededHandler} closeHandleFn = {closeHandler}/>
        if(signupNeeded) content = <UserForm type = 'signUp' authHandleFn = {authHandler} closeHandleFn = {closeHandler}/>        
    }
    else {
            content = <>
            <p>{`signed in as ${emailIdForUse} `}</p>
            <button onClick={signOutHandler} className={classes.signoutBtn}>Sign out</button>
            <button onClick={viewOrdersHandler}>My Orders</button>
            </>
        }
        const modalClassName = isLoggedIn ? classes.signoutModal : classes.modal;


        return (
            <div className = {modalClassName}>
                
                {content}
            </div>
         )} 

    return(
        <>
        {ReactDOM.createPortal(<BackDrop/>, document.getElementById('root-backdrop'))}
        {ReactDOM.createPortal(<Modal/>, document.getElementById('root-overlay'))}
        </>

    )
}

export default Auth;