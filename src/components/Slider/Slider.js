import { useEffect, useState } from 'react'
import "./Slider.scss"
import { sliderData } from './sliderData'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"


const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const slideLength = sliderData.length

    const autoScroll = true

    let slideInterval

    let intervalTime = 5000

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1)
    }

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1)
    }

    useEffect(() => {
        setCurrentSlide(0)
    }, [])

    useEffect(() => {
        if (autoScroll) {


            auto()
        }

        return () => clearInterval(slideInterval)

        // eslint-disable-next-line
    }, [currentSlide, slideInterval, autoScroll])

    const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime)
    }



    return (
        <div className="slider">
            <AiOutlineArrowLeft onClick={prevSlide} className='arrow prev' />
            <AiOutlineArrowRight onClick={nextSlide} className='arrow next' />

            {
                sliderData.map((slide, index) => {
                    const { image, heading, desc } = slide
                    return (
                        <div
                            key={index}
                            className={
                                index === currentSlide ? "slide current" : "slide"
                            }>

                            {index === currentSlide && (
                                <>
                                    <img src={image} alt={heading} />
                                    <div className="content">
                                        <h2>{heading}</h2>
                                        <p>{desc}</p>
                                        <hr />
                                        <a href="#products" className="--btn --btn-primary">
                                            Shop Now
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Slider