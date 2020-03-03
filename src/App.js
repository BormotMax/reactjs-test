import React, { useState } from 'react';

import { ReactComponent as Spinner } from './tail-spin.svg';
const subjects = {
  'Technical Report Writing': ['Short Reports', 'Annual Reports', 'Presentations'],
  'English Literature': ['Poetry', 'Short Stories', 'Drama'],
  'Computer Sciences': ['Web Development', 'Desktop Software Development', 'Research and Analysis'],
};
const radioButtons = ['Technical Report Writing', 'English Literature', 'Computer Sciences'];
const courseDates = ['2019-12-20', '2020-01-15', '2020-02-01'];
const validate = (key, value) => {
  switch (key) {
    case 'notes':
      if (value && (value.length < 20 || value.length > 500)) {
        return 'Please fill in the notes field.';
      }
      break;
    case 'date':
      if (!value) {
        return `Please fill in the ${key} field.`;
      }
      for (let i in courseDates) {
        if (courseDates[i] === value) {
          return '';
        }
      }
      return 'Your selected course and subject is not offered beginning from your selected date';
    default:
      if (!value) {
        return `Please fill in the ${key} field.`;
      } else return '';
  }
};
function App() {
  const [formData, setFormData] = useState({
    course: 'Technical Report Writing',
    subject: '',
    date: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);

  const formSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const error = {};
    let flag = 0;
    for (let key in formData) {
      const fieldError = validate(key, formData[key]);
      flag = Boolean(fieldError) ? flag : flag + 1;
      error[key] = fieldError;
    }
    setError(error);
    await setTimeout(() => {
      setLoading(false);
      if (flag === Object.keys(formData).length) {
        setSubmit(true);
      }
    }, 1000);
  };

  const handleChange = (name, value) => {
    if (value) {
      setError(prev => {
        const newError = { ...prev };
        delete newError[name];
        return newError;
      });
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="app">
      {submit && <h2>Your course has been successfully registered</h2>}
      {!submit && (
        <form className="form">
          <p className="title">
            {' '}
            <span className="red-point">*</span> Course:
          </p>
          {radioButtons.map(title => (
            <label
              key={title}
              onClick={() => {
                handleChange('course', title);
              }}
            >
              <input
                type="radio"
                name="contact"
                value={title}
                defaultChecked={title === 'Technical Report Writing' && true}
              />
              {title}
            </label>
          ))}
          {error.course && <small>{error.course}</small>}

          <p className="title">
            <span className="red-point">*</span> Subject:
          </p>
          <select
            className={error.subject && 'error'}
            onChange={({ target: { value } }) => handleChange('subject', value)}
            defaultValue={formData.subject}
          >
            {subjects[formData.course].map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
          {error.subject && <small>{error.subject}</small>}
          <p className="title">
            <span className="red-point">*</span> Start date:
          </p>
          <input
            className={error.date && 'error'}
            type="date"
            id="datepicker"
            autoComplete="off"
            onChange={({ target: { value } }) => handleChange('date', value)}
          />
          {error.date && <small>{error.date}</small>}
          <p className="title">Additional Notes:</p>
          <textarea
            rows="5"
            onChange={({ target: { value } }) => handleChange('notes', value)}
            className={error.notes && 'error'}
          />
          {error.notes && <small>{error.notes}</small>}
          {loading ? (
            <Spinner className="submit-button" />
          ) : (
            <button className="submit-button" onClick={formSubmit}>
              Submit
            </button>
          )}
        </form>
      )}
    </div>
  );
}

export default App;
