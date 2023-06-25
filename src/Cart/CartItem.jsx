import classes from './CartItem.module.css';

const CartItem = props => {

    const plusButtonHandler = () => {
        props.add(props.id);
    }

    const minusButtonHandler = () => {
        props.reduce(props.id);
    }

    return (
        <>
            <div className={classes.item}>
            <div className={classes.brand}>{props.brand}</div>
            <div className={classes.name}>{props.name}</div>
            <div> size:{props.size}</div>
            </div>
            <div className={classes.quantity}>
            qty: {props.quantity}
            <div className={classes.qtyBtns}>
            <button className={classes.up} onClick={plusButtonHandler}>+</button>
            <button className={classes.down} onClick={minusButtonHandler}>-</button>
            </div>
            </div>
            <div className={classes.itemImg}>
                <img src={props.imgUrl}/>
            </div>
        </>
    )
}

export default CartItem;