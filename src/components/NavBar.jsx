import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useSelector } from "react-redux";
import styles from './NavBar.module.css';
import CartLink from '../Cart/CartLink';
import NavDropdown from 'react-bootstrap/NavDropdown';



const NavBar = () => {

const isLoggedIn =  useSelector(state => state.user.isAuthenticated);
  
const auth = isLoggedIn? 'Sign out': 'Login';

  return(

<>
    <Navbar className={styles.navBar1}>
        <Container fluid>
          <Navbar.Brand href="/Home">
          <img
              alt="logo"
              src="/images/noonLogo.PNG"
              width="100"
              height="40"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
          <div className={styles.rightNavs}>
          <Nav.Link href="/Auth" className='me-5'>{auth}</Nav.Link>
          <CartLink/>
          </div>
        </Container>
      </Navbar>

      <Navbar className={styles.navBar2}>
        <Container fluid>
          <Nav className="me-auto">

          <NavDropdown className='mx-4' title="ALL CATEGORIES" id="basic-nav-dropdown">
              <NavDropdown.Item className='text-primary' href="#action/3.1">Mens</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Womens
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Laptops</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                About us
              </NavDropdown.Item>
              </NavDropdown>


            <Nav.Link href="#features">ELECTRONICS</Nav.Link>
            <Nav.Link href="#men">MEN</Nav.Link>
            <Nav.Link href="#women">WOMEN</Nav.Link>
            <Nav.Link href="#home">HOME</Nav.Link>
            <Nav.Link href="#beauty">BEAUTY & FRAGRANCE</Nav.Link>
            <Nav.Link href="#babies">BABY & TOYS</Nav.Link>
            <Nav.Link href="#sports">SPORTS</Nav.Link>
            <Nav.Link href="#sellers">BEST SELLERS</Nav.Link>
          </Nav>

        </Container>
      </Navbar>
      </>

   /*  <header>
        <div className={styles.logo}>
            <img src={Logo} style={{height:75, width:75}} alt= "mySVG"/>
        </div>
        <nav className={styles.nav}>
        <ul>
            <li>
             <NavLink to = '/Home'>Home</NavLink>
            </li>
            <li>
            <NavLink className={(navData) => navData.isActive ? styles.active: ''} to = '/Men'>Men</NavLink>
            </li>
            <li>
            <NavLink className={(navData) => navData.isActive ? styles.active: ''} to = '/Women'>Women</NavLink>
            </li>
            {isLoggedIn && <li>
            <NavLink className={(navData) => navData.isActive ? styles.active: ''} to = '/MyOrders'>My Orders</NavLink>
            </li>}
            <li>
            <NavLink className={navData => navData.isActive ? styles.active: ''} to = '/About'>About</NavLink>
            </li>
            <CartButton className = {styles.cartBtn}/>
            <li>
            <div className={styles.profile}>
            <NavLink to = '/Auth'>
            <img className={styles.profileIcon} src={login}  alt= "login"/>
            </NavLink>
            {isLoggedIn ? <p>Logged In</p>: <p>Logged out</p>}
            </div>
            </li>
            </ul>
            </nav>
        
        </header> */ 
    )

}

export default NavBar;