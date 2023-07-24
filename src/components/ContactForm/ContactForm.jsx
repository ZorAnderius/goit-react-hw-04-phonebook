import { useState } from 'react';
import propTypes from 'prop-types';
import { nanoid } from 'nanoid';

import contactFormCSS from './ContsctForm.module.css';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameFormID = nanoid();
  const numberFormID = nanoid();

  const handelChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ id: nanoid(), name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={contactFormCSS.contact_form} onSubmit={handleSubmit}>
      <label className={contactFormCSS.contact_label} htmlFor={nameFormID}>
        Name
      </label>
      <input
        className={contactFormCSS.contact_name_input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        id={nameFormID}
        value={name}
        onChange={handelChange}
        required
      />

      <label className={contactFormCSS.contact_label} htmlFor={numberFormID}>
        Number
      </label>
      <input
        className={contactFormCSS.contact_number_input}
        type="tel"
        name="number"
        id={numberFormID}
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        value={number}
        onChange={handelChange}
        required
      />

      <button className={contactFormCSS.contact_submit_btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
