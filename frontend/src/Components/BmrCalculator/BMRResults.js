import React, { useState, useEffect } from "react";
import { useSpring, animated } from 'react-spring';
import { useCountUp } from 'use-count-up';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import food from "../imgs/food.png";
import sport from "../imgs/sport.png";
import purposeImg from "../imgs/purpose.png";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import './BMRResults.css';




function BMRResults({ fatPercentage, proteinPercentage, carbsPercentage, result, BMR, TMR, fat, fatG, protein, proteinG, carbs, carbsG, purpose }) {

    const [size, setSize] = useState(null);
    const { value: carbsValue, reset: resetCarbs } = useCountUp({
        isCounting: true,
        duration: 3,
        start: 0,
        end: carbsPercentage,
    });

    const { value: proteinValue, reset: resetProtein } = useCountUp({
        isCounting: true,
        duration: 3,
        start: 0,
        end: proteinPercentage,
    });

    const { value: fatValue, reset: resetFat } = useCountUp({
        isCounting: true,
        duration: 3,
        start: 0,
        end: fatPercentage,
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
    
        const isMobile = mediaQuery.matches;
    
        setSize(isMobile ? '80px' : '150px');
        
        const listener = () => {
          setSize(mediaQuery.matches ? '80px' : '150px');
        };
    
        mediaQuery.addListener(listener);
    
        return () => {
          mediaQuery.removeListener(listener);
        };
      }, []);



    const BMRAnimation = useSpring({
        opacity: result ? 1 : 0,
        from: { opacity: 0 },
        config: { duration: 500 },
    });

    const TMRAnimation = useSpring({
        opacity: result ? 1 : 0,
        from: { opacity: 0 },
        config: { duration: 500 },
    });

    const PurposeAnimation = useSpring({
        opacity: result ? 1 : 0,
        from: { opacity: 0 },
        config: { duration: 500 },
    });



    return (
        <>
            <Row className="ResultRow">
                <Col lg={6} xs={6}>
                    <Row className="BMRrow">
                        <animated.div style={BMRAnimation} className="BMRdiv">
                            <Image className="foodImg" src={food} fluid />
                            <div className="BMRtext">Your BMR is: {Math.round(BMR)} kcal</div>
                        </animated.div>
                    </Row>
                    <hr></hr>
                    <Row className="TMRrow">
                        <animated.div style={TMRAnimation} className="TMRdiv">
                            <Image className="sportImg" src={sport} fluid />
                            <div className="TMRtext">Your caloric needs considering activity level are: {Math.round(TMR)} kcal</div>
                        </animated.div>
                    </Row>
                    <hr></hr>
                    <Row className="PurposeCaloriesRow">
                        <animated.div style={PurposeAnimation} className="PurposeDiv">
                            <Image className="purposeImg" src={purposeImg} fluid />
                            <div className="Purposetext">Your caloric needs considering your purpose: {Math.round(purpose)} kcal</div>
                        </animated.div>
                    </Row>
                </Col>
                <Col lg={6} xs={6} className="circleCol">
                    <Row >
                        <div className="circleDiv">
                            <CircularProgress value={proteinValue} color='black' size={size} >
                                <CircularProgressLabel>{proteinPercentage}%</CircularProgressLabel>
                            </CircularProgress>
                            <p className="underCircleText">Protein:   <p> {protein} kcal = {proteinG} g</p> </p>
                        </div>
                    </Row>
                    <Row >
                        <div className="circleDiv">
                            <div className="circle ">
                                <CircularProgress value={carbsValue} color='black' size={size}>
                                    <CircularProgressLabel>{carbsPercentage}%</CircularProgressLabel>
                                </CircularProgress>
                            </div>
                            <p className="underCircleText">Carbs:    <p>{carbs} kcal = {carbsG} g</p> </p>
                        </div>
                    </Row>
                    <Row >
                        <div className="circleDiv">
                            <CircularProgress value={fatValue} color='black' size={size}>
                                <CircularProgressLabel>{fatPercentage}%</CircularProgressLabel>
                            </CircularProgress>
                            <p className="underCircleText">Fat:    <p>{fat} kcal = {fatG} g</p> </p>
                        </div>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default BMRResults;




