import { useSelector, useDispatch } from 'react-redux';
import cartImg from '../assets/shoppingCart.svg';
import { cartActions }  from '../Redux/cart-slice';
import { Link } from 'react-router-dom';
import NavLink from 'react-bootstrap/NavLink';


const CartLink = () => {
    
    const cart = useSelector(state => state.mxCart.cart);
    const dispatch = useDispatch();
    
    const toggleCartHandler = () => {
        dispatch(cartActions.toggleCart());
    }

    const totalNoOfItems = cart.reduce((currSum, item) => {
        return currSum + item.quantity;
    }, 0) 



    return(
        <NavLink className='d-flex me-5' onClick={toggleCartHandler}>
        <p>Cart</p>
        <img src = {cartImg} style={{height:25, width:25}} alt= "myCart"/>
        <div>{totalNoOfItems || 0 }</div>
        </NavLink>
    )
}

export default CartLink;