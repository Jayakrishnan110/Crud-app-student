import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Slider from '@mui/material/Slider';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import "./Form.css";

const Form = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState(null);
  const [grade, setGrade] = useState(0);
  const [gender, setGender] = useState('male');

  const handleChange = (event) => {
    const { target } = event;
    const value = target.type === 'radio' ? target.checked : target.value;
    const name = target.name;

    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'dob':
        setDob(value);
        break;
      case 'grade':
        setGrade(value);
        break;
      case 'gender':
        setGender(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ firstName, lastName, dob, grade, gender });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
      <TextField
        label="First Name"
        name="firstName"
        value={firstName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={lastName}
        onChange={handleChange}
        required
      />
      </div>
      <div className='form-group1'>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date of Birth"
        value={dob}
        onChange={setDob}
        inputFormat="dd/MM/yyyy"
        required
      />
      </LocalizationProvider>
      </div>
      <Slider
        value={grade}
        onChange={(_, newVal) => setGrade(newVal)}
        valueLabelDisplay="auto"
        min={0}
        max={10}
        step={1}
        label="Grade"
      />
      <RadioGroup row aria-label="gender">
        <FormControlLabel
          value="male"
          control={<Radio id="maleRadio"  />}
          label="Male"
          name="gender"
          onChange={handleChange}
        />
        <FormControlLabel
          value="female"
          control={<Radio id="femaleRadio"  />}
          label="Female"
          name="gender"
          onChange={handleChange}
        />
      </RadioGroup>
      <Button type="submit" variant="contained">
        Add Student
      </Button>
    </form>
  );
};

export default Form;