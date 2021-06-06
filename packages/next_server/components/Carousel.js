import Slider from 'react-slick';
function Carousel() {
    const settings={
        infinite:true,
        slidesToShow:6,
        slidesToScroll:6
    }
    return (
        <div>
            <Slider {...settings}>

            </Slider>
        </div>
    )
}

export default Carousel;
