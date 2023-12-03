import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faPersonDress, faCalendar, faWeightScale, faRulerVertical, faStopwatch20, faCalculator, faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import './BmrCalculator.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import BMRResults from "./BMRResults";
import './BMRForm.css';


import lossWeight from "../imgs/lossWeight.png";
import keepWeight from "../imgs/keepWeight.png";
import increaseWeight from "../imgs/increaseWeight.png";





function BMRForm() {

    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedInput, setSelectedInput] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedButton, setSelectedButton] = useState(null);
    const [activity, setActivity] = useState(null);
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [TMR, setTMR] = useState(null);
    const [BMR, setBMR] = useState(null);
    const [result, setResult] = useState(false);


    const [carbs, setCarbs] = useState(null);
    const [carbsPercentage, setCarbsPercentage] = useState(null);
    const [carbsG, setCarbsG] = useState(null);


    const [protein, setProtein] = useState(null);
    const [proteinPercentage, setProteinPercentage] = useState(null);
    const [proteinG, setProteinG] = useState(null);


    const [fat, setFat] = useState(null);
    const [fatPercentage, setFatPercentage] = useState(null);
    const [fatG, setFatG] = useState(null);


    const [purpose, setPurpose] = useState(null);
    const [values, setValues] = useState({
        age: '',
        weight: '',
        height: ''
    })


    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setSelectedInput(null);
        setIsFocused(false);
    }

    const handleButtonChoose = (buttonType) => {
        setSelectedButton(buttonType);
        setResult(false);

    };


    const handleButtonClick = (gender) => {
        setSelectedGender(gender);
        setResult(false);

    }


    const handleInputChange = (input) => {
        setSelectedInput(input);
        setResult(false);

    }

    const handleSelectChange = (event) => {
        setActivity(event.target.value);
        setResult(false);

    }

    const handleValueChange = (event, name) => {
        setResult(false);

        setValues({
            ...values,
            [name]: event.target.value,
        })
    }

    useEffect(() => {
        const isComplete =
            Object.values(values).every((value) => value !== '') &&
            selectedButton !== null &&
            activity !== null &&
            selectedGender !== null;

        setIsFormComplete(isComplete);
    }, [values, activity, selectedButton, selectedGender]);

    useEffect(() => {
        if (BMR !== null && activity !== null) {
            setTMR(BMR * activity);
            if (selectedButton === "lossWeight") {
                setPurpose(TMR - 300);
            }
            else if (selectedButton === "keepWeight") {
                setPurpose(TMR);
            }
            else if (selectedButton === "increaseWeight") {
                setPurpose(TMR + 300);
            }
            else {
                return;
            }

            setCarbs(Math.round(purpose * 0.5));
            setCarbsPercentage((Math.round((carbs / purpose) * 100)));
            setCarbsG(Math.round((carbs / 4)));


            setProtein(Math.round((purpose * 0.25)));
            setProteinPercentage((Math.round((protein / purpose) * 100)));
            setProteinG(Math.round((protein / 4)));

            setFat(Math.round(purpose * 0.25));
            setFatPercentage((Math.round((fat / purpose) * 100)));
            setFatG(Math.round((fat / 9)));

        }
    }, [BMR, activity, selectedButton, purpose, TMR, fat, fatPercentage, fatG, protein, proteinG, proteinPercentage, carbs, carbsG, carbsPercentage]);


    const CalculateBMR = (event) => {
        setResult(true);

        event.preventDefault();
        console.log(activity);

        if (selectedGender === "male") {
            setBMR(66.47 + 13.7 * values.weight + 5 * values.height - 6.76 * values.age);
        } else {
            setBMR(655.1 + 9.567 * values.weight + 1.85 * values.height - 4.68 * values.age);
        }


    };




    return (
        <>
            <h3 className="h3">Calculate your caloric needs</h3>
            <Form onSubmit={CalculateBMR}>
                <Row className="genderRow">
                    <Col lg={2} xs={3}>
                        <span className="Gender">Gender:</span>
                    </Col>
                    <Col lg={2} xs={4}>
                        <Button
                            className={`genderButton ${selectedGender === 'male' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('male')}
                            variant="none"
                        >
                            <FontAwesomeIcon icon={faPerson} /> Male
                        </Button>
                    </Col>
                    <Col lg={2} xs={4}>
                        <Button
                            className={`genderButton ${selectedGender === 'female' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('female')}
                            variant="none"
                        >
                            <FontAwesomeIcon icon={faPersonDress} /> Female
                        </Button>
                    </Col>
                </Row>

                <Row className="MeasurementsRow">
                    <Col lg={2} xs={4} className="ageCol">
                        <Form.Label htmlFor="firstFormControlBMR">
                            <div className={`measurementIconActive ${selectedInput === 'age' ? 'active' : ''}`}
                            ><FontAwesomeIcon icon={faCalendar} /> Age:</div>              </Form.Label>
                        <Form.Control
                            id="firstFormControlBMR"
                            className="MeasurementInput"
                            onClick={() => handleInputChange('age')}
                            value={values.age}
                            onChange={(event) => handleValueChange(event, 'age')}
                            onBlur={handleInputBlur}
                            type="number"
                            required
                            min={1}
                        >

                        </Form.Control>
                    </Col>

                    <Col lg={2} xs={4} className="weightCol">
                        <Form.Label htmlFor="secondFormControlBMR">
                            <div className={`measurementIconActive ${selectedInput === 'weight' ? 'active' : ''}`}
                            ><FontAwesomeIcon icon={faWeightScale} /> Weight:</div>
                        </Form.Label>
                        <Form.Control
                            id="secondFormControlBMR"
                            className="MeasurementInput"
                            onClick={() => handleInputChange('weight')}
                            onBlur={handleInputBlur}
                            value={values.weight}
                            onChange={(event) => handleValueChange(event, 'weight')}
                            type="number"
                            required
                            min={1}
                        >
                        </Form.Control>
                    </Col>

                    <Col lg={2} xs={4} className="heightCol">
                        <Form.Label htmlFor="thirdFormControlBMR">
                            <div className={`measurementIconActive ${selectedInput === 'height' ? 'active' : ''}`}>
                                <FontAwesomeIcon icon={faRulerVertical} /> Height:</div>

                        </Form.Label>
                        <Form.Control
                            id="thirdFormControlBMR"
                            className="MeasurementInput"
                            onClick={() => handleInputChange('height')}
                            onBlur={handleInputBlur}
                            value={values.height}
                            onChange={(event) => handleValueChange(event, 'height')}
                            type="number"
                            required
                            min={1}
                        >
                        </Form.Control>
                    </Col>
                </Row>

                <Row className="activityRow">
                    <Col lg={8}>
                        <div className={`ActivityLevelDiv ${isFocused ? 'active' : ''}`}>
                            <FontAwesomeIcon className="icon" icon={faStopwatch20} /> Activity level:
                        </div>
                        <Form.Select
                            id="selectFormControlBMR"
                            className="FormSelectActivity"
                            onFocus={handleFocus}
                            onBlur={handleInputBlur}
                            onChange={handleSelectChange}
                            value={activity}
                        >
                            <option value="" disabled selected>Choose your activity level.</option>
                            <option value={1.2}>1. Sedentary: If you get minimal or no exercise.</option>
                            <option value={1.4}>2. Lightly active: If you exercise lightly one to three days a week.</option>
                            <option value={1.6}>3. Moderately active: If you exercise moderately three to five days a week.</option>
                            <option value={1.8}>4. Very active: If you engage in hard exercise six to seven days a week.</option>
                            <option value={2}>5. Extra active: If you engage in very hard exercise six to seven days a week or have a physical job.</option>
                        </Form.Select>

                    </Col>
                </Row>

                <Row className="PurposeRow">
                    <div className="PurposeDiv">
                        <FontAwesomeIcon className="icon" icon={faCrosshairs} /> Your purpose:
                    </div>
                    <Col lg={4} xs={4}>
                        <Button
                            className={`weightButton ${selectedButton === 'lossWeight' ? 'active' : ''}`}
                            onClick={() => handleButtonChoose('lossWeight')}
                            variant="none"
                        ><Image src={lossWeight} fluid /> Lose weight
                        </Button>
                    </Col>

                    <Col lg={4} xs={4}>
                        <Button
                            className={`weightButton ${selectedButton === 'keepWeight' ? 'active' : ''}`}
                            onClick={() => handleButtonChoose('keepWeight')}
                            variant="none"
                        ><Image src={keepWeight} fluid /> Keep weight
                        </Button>
                    </Col>

                    <Col lg={4} xs={4}>
                        <Button
                            className={`weightButton ${selectedButton === 'increaseWeight' ? 'active' : ''}`}
                            onClick={() => handleButtonChoose('increaseWeight')}
                            variant="none"
                        ><Image src={increaseWeight} fluid /> Increase weight
                        </Button>
                    </Col>

                </Row>
                <Row className="CalculateRow">
                    <Col lg={6}>
                        <Button
                            variant="none"
                            className="CalculateButton"
                            type="submit"
                            disabled={!isFormComplete}
                        ><FontAwesomeIcon icon={faCalculator} /> Calculate</Button>
                    </Col>
                </Row>
            </Form>
            {result ? (
                <BMRResults
                    carbsPercentage={carbsPercentage}
                    proteinPercentage={proteinPercentage}
                    fatPercentage={fatPercentage}
                    result={result}
                    BMR={BMR}
                    TMR={TMR}
                    purpose={purpose}
                    protein={protein}
                    proteinG={proteinG}
                    carbs={carbs}
                    carbsG={carbsG}
                    fat={fat}
                    fatG={fatG}

                />
            ) : (<></>)}
        </>
    );
}

export default BMRForm;




