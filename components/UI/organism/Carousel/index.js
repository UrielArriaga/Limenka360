import React from "react";
import styled from "styled-components";

import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import CustomLeftArrow from "../../molecules/CustomLeftArrow";
import CustomRightArrow from "../../molecules/CustomRigthArrow";

export default function CarouselComponent(props) {
  const { time, components, renderChildren, children } = props;

  if (renderChildren) {
    return (
      <Container>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={time ? time : 5000}
          centerMode={false}
          className=""
          containerClass="carousel-container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          responsive={responsive}
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          {children}
        </Carousel>
      </Container>
    );
  }
  return (
    <Container>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={time ? time : 5000}
        centerMode={false}
        className=""
        containerClass="carousel-container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        responsive={responsive}
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {components}
      </Carousel>
    </Container>
  );
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Container = styled.div`
  .carousel-container {
    background-color: #ffff;
    /* background-color: red; */
    width: 100%;
    height: 380px;
  }
`;
