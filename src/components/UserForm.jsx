import { useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import classes from './UserForm.module.css';

const UserForm = props => {

const emailIdInput  = useRef();
const passWordInput = useRef();
const passWordCInput = useRef();
const userNameInput = useRef();

const authenticate = (e) => {
    e.preventDefault();
    const email = emailIdInput.current.value;
    const passWord = passWordInput.current.value;
    const check   = passWordCInput.current.value;
    const isValid = passWord.includes('@') && (passWord == check);

    let userName = '';
    if(userNameInput.current){
    userName = userNameInput.current.value;
    }
    if(isValid)
    props.authHandleFn(e, email, passWord, userName);

    else {
      alert('Password mismatch');
      return;
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
        <Modal.Header closeButton>
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
        
        <p>No Account ?</p>
        <Modal.Footer>
          <Button onClick={props.signUpNeededHandleFn} variant="secondary">Sign up</Button>
          <Button onClick={props.closeHandleFn} variant="primary">Close</Button>
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
        <Modal.Header closeButton>
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
        <input id="passWordConfirm" ref={passWordCInput}/>
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