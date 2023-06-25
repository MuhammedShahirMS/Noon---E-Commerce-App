import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { cartActions } from '../Redux/cart-slice';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from "react-bootstrap/Row";
import styles from './Product.module.css';
import Button from 'react-bootstrap/Button';


export const Product = () => {

    const location = useLocation();
    const dispatch = useDispatch();

    const data = location.state;
    console.log(data.price);
    const modifiedPrice = `AED ${data.price.toFixed(2)}`;

    
   

    const addToCartHandler = () => {
        dispatch(cartActions.addToCart({
            ...data,
            id: data.id,
    
        }))
    }
    
    
    return(
        <Container className={styles.productDetail} fluid>
            <Row> 
            <Col xs={12} md = {{span:3, offset:1}}>
                <div>
            <img src={data.imgUrl} height= '500' style={{objectFit: 'cover'}}/>
            </div>
            </Col>
        <Col className="mt-5 text-start" xs={12} md = {{span:4, offset:1}}> 
        <div>
        <h2>{data.brand}</h2>
        <h3>{data.name}</h3>
        <div className={styles.price}>Now: 
           <p>{modifiedPrice}</p> 
           Inclusive of VAT 
            </div>
        <Button variant="primary" className="mt-5" onClick={addToCartHandler}>Add To Cart</Button>
        </div>
        </Col>
        </Row>
        </Container>
    )

}

export default Product;