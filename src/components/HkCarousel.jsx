import React from 'react';
import { Carousel } from 'antd';

const HkCarousel = (props) => {
    const dots = props.dots || false;
    const effect = props.effect || 'scrollx';
    const autoplay = props.autoplay || false;


        return (
            <Carousel autoplay={autoplay} dots={dots} effect={effect}>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
        </Carousel>
    }      
}