import { useNavigate } from 'react-router-dom';
import styles from './Item.module.css';
import Card from 'react-bootstrap/Card';

const Item = props => {
 

    const navigate = useNavigate();

    const showItemHandler = () => {
        navigate(`/Product/${props.id}` , {state: props});
        
    }

    const modifiedPrice = `AED ${props.price.toFixed(2)}`;
    
    return (
        <>

            <Card  style={{ cursor:'pointer' }} onClick={showItemHandler} >
            <Card.Img variant="top" src={props.imgUrl} />
            <Card.Body>
            <p className={styles.name}>{props.brand} {props.name}</p>
            <p  className={styles.price}>{modifiedPrice}</p>
            </Card.Body>
    </Card>
            {/* <Image fluid onClick={showItemHandler} src = {props.imgUrl} alt='men'/>
            <div>
            <p>{props.name}</p>
            <p>{modifiedPrice}</p>
            </div> */}
            
        </>
    )
}

export default Item;