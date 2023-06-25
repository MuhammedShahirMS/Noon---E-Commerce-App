import { useLocation } from "react-router-dom";
import products from '../assets/Inventory.json';
import Item from "../components/Item";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CategoryItems = () => {

    const location = useLocation();

    const category = location?.state.catg;

    
    const isEmpty = category === '';
    const categoryProducts = products.filter(item => item.category === category);


    return(
        <Container fluid>
            {category && <Row xs={2} md={6}>
            {categoryProducts.map(item => <Col key={item.id}><Item {...item}/></Col>)}
            {isEmpty && <h1>No Products found</h1>}
            </Row>}
            
        </Container>
    )

}

export default CategoryItems;