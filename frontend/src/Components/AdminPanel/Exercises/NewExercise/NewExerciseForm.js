import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Row from 'react-bootstrap/Row';
import './NewExerciseForm.css';
import { createNewExercise } from './AddNewExercise';


function NewExerciseForm({ show, setShow, setExercisesListUpdate, exercisesListUpdate  }) {
    const [validated, setValidated] = useState(false);

    const [values, setValues] = useState({
        ExerciseName: '',
        MainMuscleGroup: '',
        SecondaryMuscleGroup1: '',
        SecondaryMuscleGroup2: '',
        GifLink: '',
        Description: '',
        LinkToYTVideo: '',
        Difficulty: '',
        Equipment: '',
    })



    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            createNewExercise(values);
            setExercisesListUpdate(true);
            setShow(false);

        }
        setValidated(true);
        console.log(values);
    };


    const handleValueChange = (event, name) => {
        setValues({
            ...values,
            [name]: event.target.value,
        })
    }



    return (

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className='NewExerciseFormRow'>

                <Form.Group as={Col} lg="6" className='NewExerciseFormGroup'>
                    <Form.Label className='NewExerciseFormLabel'>Exercise name</Form.Label>
                    <Form.Control
                        className='NewExerciseFormControl'
                        required
                        type="text"
                        placeholder="Exercise name"
                        value={values.ExerciseName}
                        onChange={(event) => handleValueChange(event, 'ExerciseName')}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid exercise name.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback >
                        Looks good!
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} lg="6" className='NewExerciseFormGroup'>
                    <Form.Label className='NewExerciseFormLabel'>Main muscle group</Form.Label>
                    <Form.Control
                        className="NewExerciseFormControl"
                        type="select"
                        as="select"
                        required
                        value={values.MainMuscleGroup}
                        onChange={(event) => handleValueChange(event, 'MainMuscleGroup')}
                    >
                        <option value="" disabled selected>Choose muscle group</option>
                        <option value={"Waist"}>Waist</option>
                        <option value={"Chest"}>Chest</option>
                        <option value={"Shoulders"}>Shoulders</option>
                        <option value={"Back"}>Back</option>
                        <option value={"Glutes"}>Glutes</option>
                        <option value={"Upper legs"}>Upper legs</option>
                        <option value={"Lower legs"}>Lower legs</option>
                        <option value={"Biceps"}>Biceps</option>
                        <option value={"Triceps"}>Triceps</option>
                        <option value={"Forearms"}>Forearms</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid" >
                        Please choose a valid muscle group.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback >
                        Looks good!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>



            <Row>
                <Form.Group as={Col} lg="6" className='NewExerciseFormGroup'>
                    <Form.Label className='NewExerciseFormLabel'>Secondary muscle group (1)</Form.Label>
                    <Form.Control
                        className="NewExerciseFormControl"
                        type="select"
                        as="select"
                        value={values.SecondaryMuscleGroup1}
                        onChange={(event) => handleValueChange(event, 'SecondaryMuscleGroup1')}
                    >
                        <option value="" disabled selected>Choose muscle group</option>
                        <option value={"Waist"}>Waist</option>
                        <option value={"Chest"}>Chest</option>
                        <option value={"Shoulders"}>Shoulders</option>
                        <option value={"Back"}>Back</option>
                        <option value={"Glutes"}>Glutes</option>
                        <option value={"Upper legs"}>Upper legs</option>
                        <option value={"Lower legs"}>Lower legs</option>
                        <option value={"Biceps"}>Biceps</option>
                        <option value={"Triceps"}>Triceps</option>
                        <option value={"Forearms"}>Forearms</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid" >
                        Please choose a valid muscle group.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback >
                        Looks good!
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} lg="6" className='NewExerciseFormGroup'>
                    <Form.Label className='NewExerciseFormLabel'>Secondary muscle group (2)</Form.Label>
                    <Form.Control
                        className="NewExerciseFormControl"
                        type="select"
                        as="select"
                        value={values.SecondaryMuscleGroup2}
                        onChange={(event) => handleValueChange(event, 'SecondaryMuscleGroup2')}
                    >
                        <option value="" disabled selected>Choose muscle group</option>
                        <option value={"Waist"}>Waist</option>
                        <option value={"Chest"}>Chest</option>
                        <option value={"Shoulders"}>Shoulders</option>
                        <option value={"Back"}>Back</option>
                        <option value={"Glutes"}>Glutes</option>
                        <option value={"Upper legs"}>Upper legs</option>
                        <option value={"Lower legs"}>Lower legs</option>
                        <option value={"Biceps"}>Biceps</option>
                        <option value={"Triceps"}>Triceps</option>
                        <option value={"Forearms"}>Forearms</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid" >
                        Please choose a valid muscle group.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback >
                        Looks good!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Form.Group as={Col} className='NewExerciseFormGroup'>
                <Form.Label className='NewExerciseFormLabel'>Gif link</Form.Label>
                <Form.Control
                    className='NewExerciseFormControl'
                    type="text"
                    placeholder="Gif link"
                    required
                    value={values.GifLink}
                    onChange={(event) => handleValueChange(event, 'GifLink')}
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid gif link.
                </Form.Control.Feedback>
                <Form.Control.Feedback >
                    Looks good!
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} className='NewExerciseFormGroup'>
                <Form.Label className='NewExerciseFormLabel'>Description</Form.Label>
                <Form.Control
                    className='NewExerciseFormControl'
                    as="textarea"
                    rows={5}
                    placeholder="Description"
                    required
                    value={values.Description}
                    onChange={(event) => handleValueChange(event, 'Description')}
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid description.
                </Form.Control.Feedback>
                <Form.Control.Feedback >
                    Looks good!
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} className='NewExerciseFormGroup'>
                <Form.Label className='NewExerciseFormLabel'>Link to YouTube video</Form.Label>
                <Form.Control
                    className='NewExerciseFormControl'
                    type='text'
                    placeholder="Link to YouTube video"
                    required
                    value={values.LinkToYTVideo}
                    onChange={(event) => handleValueChange(event, 'LinkToYTVideo')}
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid link to YouTube video.
                </Form.Control.Feedback>
                <Form.Control.Feedback >
                    Looks good!
                </Form.Control.Feedback>
            </Form.Group>

            <Row>

                <Form.Group as={Col} lg="6" className='NewExerciseFormGroup'>
                    <Form.Label className='NewExerciseFormLabel'>Difficulty</Form.Label>
                    <Form.Control
                        className="NewExerciseFormControl"
                        type="select"
                        as="select"
                        required
                        value={values.Difficulty}
                        onChange={(event) => handleValueChange(event, 'Difficulty')}
                    >
                        <option value="" disabled selected>Choose difficulty</option>
                        <option value={"Beginner"}>Beginner</option>
                        <option value={"Intermediate"}>Intermediate</option>
                        <option value={"Advanced"}>Advanced</option>

                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please choose a valid difficulty.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback >
                        Looks good!
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} lg="6" className='NewExerciseFormGroup'>
                    <Form.Label className='NewExerciseFormLabel'>Equipment</Form.Label>
                    <Form.Control
                        className="NewExerciseFormControl"
                        type="select"
                        as="select"
                        value={values.Equipment}
                        onChange={(event) => handleValueChange(event, 'Equipment')}
                    >
                        <option value="" disabled selected>Choose equipment</option>
                        <option value={"Kettleball"}>Kettleball</option>
                        <option value={"Pull-up Bar"}>Pull-up Bar</option>
                        <option value={"Dumbbells"}>Dumbbells</option>
                        <option value={"Barbell"}>Barbell</option>
                        <option value={"Box"}>Box</option>
                        <option value={"Weight plate"}>Weight plate</option>

                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please choose a valid equipment.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback >
                        Looks good!
                    </Form.Control.Feedback>
                </Form.Group>

            </Row>

            <div className='NewExerciseFormSubmitButtonDiv'>
                <Button variant='dark' className='NewExerciseFormSubmitButton' type="submit"> Submit form <FontAwesomeIcon icon={faCheck} size='lg' /></Button>
            </div>
        </Form>

    );
}

export default NewExerciseForm;