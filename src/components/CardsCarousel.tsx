import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const imageArr = [
  {
  url: "https://www.capi.com/wp-content/uploads/2019/02/SPL-L1.png"
},
  {
  url: "https://blog-assets.lightspeedhq.com/img/2021/03/b26bcdcf-blog_coffee-shop-equipment-list_1200x628.jpg"
},
  {
  url: "https://southsidegym.ie/wp-content/uploads/2022/05/Untitled-design-2_11zon.jpg"
}
]

interface Props {
    title: string | undefined
    subtitle: string| undefined
    description: string| undefined
    // image: string| undefined
}
const CardsCarousel = ({title, subtitle, description}: Props) => {
  return (
    <Carousel autoPlay>
                <div>
                    <img src={imageArr[0].url} alt={description}/>
                    <p className="legend">{title}</p>
                </div>
                <div>
                    <img src={imageArr[1].url} alt={description}/>
                    <p className="legend">{subtitle}</p>
                </div>
                <div>
                    <img src={imageArr[2].url} alt={description}/>
                    <p className="legend">{description}</p>
                </div>
            </Carousel>
  )
}


export default CardsCarousel