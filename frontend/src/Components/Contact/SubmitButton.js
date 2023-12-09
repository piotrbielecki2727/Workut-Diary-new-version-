// SubmitButton.js
import React from 'react';
import Button from 'react-bootstrap/Button';

function SubmitButton({ onSubmit }) {
    return <Button type="submit" onClick={onSubmit}>Submit form</Button>;
}

export default SubmitButton;