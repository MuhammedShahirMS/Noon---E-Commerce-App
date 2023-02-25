import ReactDOM from "react-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { cartActions } from '../Redux/cart-slice';

const Cart = () => {

console.log('Playing in cart')
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

const Modal = () => {


    return (
        <div className= {classes.modal}>
            <h1> Cart </h1>
            <ul>
                {cart.map(item => <li key={item.id}> <CartItem {...item} 
                add    = {addItemHandler}
                reduce = {reduceItemHandler}
                /></li>)}
            </ul>
            
            {emptyCart && <div className={classes.empty}>No items in the Cart..Please add Items</div>}
            {!emptyCart && <div className= {classes.summary}>
            <h3> Cart Total </h3> =
            <p className={classes.total}> {modifiedTotal} </p>
            </div>}
            <div className = {classes.cartActions}>
            <button className={classes.close} onClick={closeHandler}>Close</button>
            { !emptyCart && <button className={classes.order} onClick={orderHandler}>Order</button>}
            </div>
        </div>
    )
}

 if(isDisplayed)
    return(
        <>
        {ReactDOM.createPortal(<BackDrop/>, document.getElementById('root-backdrop'))}
        {ReactDOM.createPortal(<Modal/>, document.getElementById('root-overlay'))}
        </>

    )

}

export default Cart;