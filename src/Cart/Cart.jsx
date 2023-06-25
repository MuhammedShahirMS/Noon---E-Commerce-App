import ReactDOM from "react-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { cartActions } from '../Redux/cart-slice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Cart = () => {


const cart          = useSelector(state => state.mxCart.cart);
const isDisplayed   = useSelector(state => state.mxCart.isCartVisible);
const totalPrice    = useSelector(state => state.mxCart.totalPrice);
const isLoggedIn    = useSelector(state => state.user.isAuthenticated);
const modifiedTotal = `AED   ${totalPrice.toFixed(2)}`;
const dispatch      = useDispatch();
const navigate      = useNavigate();

const emptyCart = cart.length === 0;

const orderHandler = () => {
dispatch(cartActions.toggleCart())
if(isLoggedIn) {
navigate('/Orders', {state: {totalAmount: modifiedTotal,
                             myCart     : cart
                            }                  
})}

else {
    navigate('/Auth', {state: {totalAmount : modifiedTotal,
                               myCart      : cart,
                               notLoggedIn : true
                              }});
}
}


const closeHandler = () => {
dispatch(cartActions.toggleCart());
}

const addItemHandler = (id) => {
    dispatch(cartActions.addQuantity(id));
}

const reduceItemHandler = (id) => {
    dispatch(cartActions.reduceQuantity(id));
}

const BackDrop = () => {
    return (
        <div onClick={closeHandler} className={classes.backdrop}/>
    )}

const ModalCart = () => {

    return (
        <div className={classes.modale}>
        <div
        className="modal show centered"
        style={{ display: 'block', position: 'initial' }}
    >
        <Modal.Dialog>
        <Modal.Header closeButton onClick={closeHandler}>
        <Modal.Title>Cart</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <ul>
                {cart.map(item => <li key={item.id}> <CartItem {...item} 
                add    = {addItemHandler}
                reduce = {reduceItemHandler}
                /></li>)}
            </ul>
            
            {emptyCart && <div className={classes.empty}>No items in the Cart..Please add Items</div>}
            
        
        </Modal.Body>
        {!emptyCart && <div className= {classes.summary}>
            <p>Total Amount - </p>
            <p className={classes.total}> {modifiedTotal} </p>
            </div>}
        <Modal.Footer>
          <Button variant="secondary" className={classes.close} onClick={closeHandler}>Close</Button>
          { !emptyCart && <Button variant="primary" onClick={orderHandler}>Order</Button>}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
    </div>
        
    )
}

 if(isDisplayed)
    return(
        <>
        {ReactDOM.createPortal(<ModalCart/>, document.getElementById('root-overlay'))}
        {ReactDOM.createPortal(<BackDrop/>, document.getElementById('root-backdrop'))}
        
        </>

    )

}

export default Cart;