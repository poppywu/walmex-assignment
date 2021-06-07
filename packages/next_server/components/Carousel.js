import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import MyLink from "./MyLink";

function Carousel({ recomData, username }) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {recomData.map((data) => {
        return (
          <div key={data.id}>
            <MyLink data={data} username={username}>
              <div>
                <Image src={"/images/" + data.img} height={100} width={100} />
                <p>{data.name}</p>
                <p>{data.price}</p>
              </div>
            </MyLink>
          </div>
        );
      })}
    </Slider>
  );
}

export default Carousel;
