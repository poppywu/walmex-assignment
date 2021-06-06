import Slider from 'react-slick';
import Image from 'next/image';
function Carousel({recomData}) {
    const settings={
        dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    }
    return (
        <div>
            <Slider {...settings}>
            {recomData.map(item=>{return(<div key={item.id}>
                {/* <Image src={item.img} width={200} height={200}/> */}
                <p>{item.name}</p>
                <p>{item.price}</p>
            </div>)})}

            </Slider>
        </div>
    )
}

export default Carousel;
