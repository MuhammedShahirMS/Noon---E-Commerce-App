import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import classes from './Categories.module.css';

const Categories = () => {

    const navigate = useNavigate(); 

    const categoryHandler = (e) => {
        navigate('/Category', {state: { catg : e.target.getAttribute('catg')}} )
    }

    return (
        <>
        <h2 className='text-start text-secondary'>Select Products here</h2>
        < Row xs={12} className={classes.categories}>
        <Col>
        <Image catg={'gaming'} src='/images/gaming.png' onClick={categoryHandler} />
        </Col>
        <Col>
        <Image catg={'laptops'} src='/images/laptop.png' onClick={categoryHandler} />
        </Col>
        <Col>
        <Image catg={'deals'} src='/images/deals.png' onClick={categoryHandler} />
        </Col>
        <Col>
        <Image catg={'clearance'} src='/images/clearance.png' onClick={categoryHandler} />
        </Col>
        <Col>
        <Image catg={'giftcards'} src='/images/giftcard.avif' onClick={categoryHandler} />
        </Col>
        <Col>
        <Image catg={'mobiles'} src='/images/mobiles.png' onClick={categoryHandler} />
        </Col>
        <Col>
        <Image catg={'laptops'} src='/images/laptop accessories.avif' onClick={categoryHandler} />
        </Col>
        <Col>
        <Image catg={'beauty'} src='/images/beauty.avif' onClick={categoryHandler} />
        </Col>
        <Col>
        <Image catg={'mens'} src='/images/mens.avif' onClick={categoryHandler} />
        </Col>
        <Col>
        <Image catg={'womens'} src='/images/womens.avif' onClick={categoryHandler} />
        </Col>
        <Col>
        <Image catg={'kitchen'} src='/images/kitchen.avif' onClick={categoryHandler} />
        </Col>
        <Col>
        <Image catg={'babies'} src='/images/baby.avif' onClick={categoryHandler} />
        </Col>
        </Row>
        </>
    )

}

export default Categories;