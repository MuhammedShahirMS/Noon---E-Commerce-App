import products from "../assets/Inventory.json";
import Item from "../components/Item";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Slides from '../components/Slides';
import Categories from '../components/Categories';
import classes from './Home.module.css';

const Home = () => {

    return(
        <Container fluid>
            <Row className={classes.graphics}>
            <Col xs={12} md={8} className='px-0'>
            <Slides/>
            </Col>
            </Row>
            <Categories/>
            <h2 className='text-start text-secondary mt-4'>All Products</h2>
            <Row xs={2} md={6}>
                {products.map(item => <Col className={classes.card} key={item.id}><Item {...item}/></Col>)}
            </Row>
            
        </Container>
    )

}

export default Home;

