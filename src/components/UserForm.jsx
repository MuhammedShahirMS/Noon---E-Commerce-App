import { useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import classes from './UserForm.module.css';

const UserForm = props => {

const emailIdInput  = useRef();
const passWordInput = useRef();
const passWordConfirmInput = useRef();
const userNameInput = useRef();

const authenticate = (e) => {
    e.preventDefault();
    const email = emailIdInput.current.value;
    const emailIsValid = email.includes('@');
    if(!emailIsValid){
      alert('Enter a Valid email id');
      return;
    }
    const passWord = passWordInput.current.value;
    let passWordIsValid = false;
    if(props.type === 'signUp'){
      const confirmPassword = passWordConfirmInput.current.value;
      if(confirmPassword !== passWord){
        alert('Enter matching Passwords');
        return;
      }
      passWordIsValid = email.includes('@');
    }
    else if(props.type === 'signIn') {
      passWordIsValid = email.includes('@');
    }
    
    let userName = '';
    if(userNameInput.current){
    userName = userNameInput.current.value;
    }
  
    if(passWordIsValid){
    props.authHandleFn(e, email, passWord, userName);
    }
}

let form;

if(props.type === 'signIn') {
    form = 
    <div  className={classes.mod}>
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton onClick={props.closeHandleFn}>
          <Modal.Title>Login here</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <form>
        <h2>Please Login:</h2>
        <label htmlFor="emailId">e-mail id:</label>
        <input id="emailId" ref={emailIdInput}/>
        <label htmlFor="passWord">Password:</label>
        <input id="passWord" ref={passWordInput}/>
        <Button id="login" onClick={authenticate}>Login</Button>
        </form>
        </Modal.Body>
        
        <p className="px-5">No Account ?</p>
        <Modal.Footer>
          <Button onClick={props.signUpNeededHandleFn} variant="primary">Sign up</Button>
          <Button onClick={props.closeHandleFn} variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
    </div>
}
    

else {
    form =
    <div className={classes.mod}>
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton onClick={props.closeHandleFn}>
          <Modal.Title>Register here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
        <h2>Signup:</h2>
        <label htmlFor="emailId">e-mail id:</label>
        <input id="emailId" ref={emailIdInput}/>
        <label htmlFor="passWord">Enter Password:</label>
        <input id="passWord" ref={passWordInput}/>
        <label htmlFor="passWordConfirm">Confirm Password:</label>
        <input id="passWordConfirm" ref={passWordConfirmInput}/>
        <label htmlFor="displayName">Enter Name:</label>
        <input id="displayName" ref={userNameInput}/>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" id="signup" onClick={authenticate}>Sign up</Button>
          <Button variant="secondary" onClick={props.closeHandleFn}>Close</Button>
        </Modal.Footer>
        </Modal.Dialog>
        </div>
        </div>
    
    }
   
        return (
            <>
            {form}
            </>
        )

    }

export default UserForm;