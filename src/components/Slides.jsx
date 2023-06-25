import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import styles from './Slides.module.css';




const Slides = () => {

    return (
    <Carousel className={styles.carousel} onClick={() => alert('No Feature implemented as of now')}>
        <Carousel.Item interval={900}>
          <Image fluid
            className="d-block"
            src="/images/Slide00000.avif"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={900}>
          <Image fluid
            className="d-block"
            src="/images/Slide0000.avif"
            alt="Second slide"
          />
        </Carousel.Item >
        <Carousel.Item interval={900}>
          <Image fluid
            className="d-block"
            src="/images/Slide000.avif"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={900}>
          <Image fluid
            className="d-block"
            src="/images/Slide00.avif"
            alt="Fourth slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={900}>
          <Image fluid
            className="d-block"
            src="/images/Slide1.avif"
            alt="Fifth slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={900}>
          <Image fluid
            className="d-block"
            src="/images/Slide2.avif"
            alt="Sixth slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={900}>
          <Image fluid
            className="d-block"
            src="/images/Slide3.avif"
            alt="Seventh slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={900}>
          <Image fluid
            className="d-block"
            src="/images/Slide4.avif"
            alt="Eighth slide"
          />
        </Carousel.Item>
      </Carousel>
      )
}

export default Slides;

