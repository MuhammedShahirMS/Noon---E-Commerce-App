import { useState, useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';
import CartLink from '../Cart/CartLink';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const NavBar = () => {

const [show, setShow] = useState(false);
const searchText = useRef();

const searchHandler = (e) => {
  e.preventDefault();
  alert(`You just searched ${searchText.current.value}`);
}

const showDropdown = (e)=>{
setShow(!show);
}
const hideDropdown = e => {
setShow(false);
}

const isLoggedIn =  useSelector(state => state.user.isAuthenticated);
const navigate = useNavigate(); 

const categoryHandler = (e) => {
    navigate('/Category', {state: { catg : e.target.getAttribute('catg')}} )
}
  
const auth = isLoggedIn? 'Sign out': 'Login';

  return( <>
  
    <Navbar className={styles.navBar1}>
        <Container fluid>
          <Row className={styles.row}>
            <Col>
            <Navbar.Brand onClick={() => {navigate('/Home')}}>
            <img
              alt="logo"
              src="/images/noonLogo.PNG"
              width="100"
              height="40"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          </Col>
          <Col xs={12} md={{span:6, offset:2}} >
           <Form onSubmit={searchHandler}>
            <Form.Control
              type="search"
              placeholder="Search"
              width='10000'
              className="me-2"
              aria-label="Search"
              ref={searchText}
            />
          </Form> 
          </Col>
          <Col  xs={12} md={1}>
          <Nav.Link className='text-end' onClick={() => {navigate('/auth')}}>{auth}</Nav.Link>
          </Col>
          <Col  xs={12} md={1}>
          <CartLink />
          </Col>
          </Row>
        </Container>
      </Navbar>

      <Navbar className={styles.navBar2} collapseOnSelect expand="lg" bg="white" variant="light">
      <Container fluid>
      
      <NavDropdown className='ms-5' title="TRENDS" id="collasible-nav-dropdown" 
        show={show}
        onMouseEnter={showDropdown} 
        onMouseLeave={hideDropdown}
        >
        <NavDropdown.Item catg = 'mens' onClick={categoryHandler}>MEN</NavDropdown.Item>
        <NavDropdown.Item catg="womens" onClick={categoryHandler}>WOMEN</NavDropdown.Item>
        <NavDropdown.Item catg="babies" onClick={categoryHandler}>BABIES</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => {navigate('/Home')}}>About us</NavDropdown.Item>
        </NavDropdown>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-5">
            <Nav.Link catg="laptops" onClick={categoryHandler}>ELECTRONICS</Nav.Link>
            <Nav.Link catg="mens" onClick={categoryHandler}>MEN</Nav.Link>
            <Nav.Link catg="womens" onClick={categoryHandler}>WOMEN</Nav.Link>
            <Nav.Link catg="home" onClick={categoryHandler}>HOME</Nav.Link>
            <Nav.Link catg="beauty" onClick={categoryHandler}>BEAUTY & FRAGRANCE</Nav.Link>
            <Nav.Link catg="babies" onClick={categoryHandler}>BABY & TOYS</Nav.Link>
            <Nav.Link catg="sports" onClick={categoryHandler}>SPORTS</Nav.Link>
            <Nav.Link catg="sell" onClick={categoryHandler}>SELL ON NOON</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </>
    )

}

export default NavBar;