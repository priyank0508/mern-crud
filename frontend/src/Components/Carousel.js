import Carousel from 'react-bootstrap/Carousel';
import image1 from '../assets/img/image1.jpeg'
import image2 from '../assets/img/image2.jpeg'
import image3 from '../assets/img/image3.jpeg'

function ImageCarousel() {
  return (
    <div className='col-9'>
    <Carousel>
      <Carousel.Item>
        <img src={image1} className="d-block w-100 " alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={image2} className="d-block w-100" alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={image3} className="d-block w-100" alt="First slide" />
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default ImageCarousel;