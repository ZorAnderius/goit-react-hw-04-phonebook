import React from 'react';
import { useState, useEffect } from 'react';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import appCSS from './App.module.css';

import contacts from './contacts_data.json';
import { Notification } from './Notification/Notification';

const STORAGE_KEY = 'contacts';

export const App = () => {
  const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const initalArr = storageData && storageData.length ? storageData : contacts;

  const [contact, setContact] = useState([...initalArr]);
  const [filterQuery, setFilterQuery] = useState('');

  const filterContacts = e => {
    setFilterQuery(e.currentTarget.value);
  };

  const addContactToList = contact => {
    setContact(prev => {
      const isInclude = prev.find(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      );

      if (isInclude) {
        alert(
          `Sorry, but the contact ${contact.name} is already in your phone book `
        );
        return;
      }

      return [...prev, contact];
    });
  };

  const onRemoveContact = contactID => {
    setContact(prev => {
      const newContactList = prev.filter(contact => contact.id !== contactID);
      return [...newContactList];
    });
  };

  const checkSameContact = () => {
    const normalaizedFilter = filterQuery.toLowerCase();
    return contact.filter(contact =>
      contact.name.toLowerCase().includes(normalaizedFilter)
    );
  };

  useEffect(() => {
    if (contact) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contact));
    }
  }, [contact]);

  const contactsCount = contact.length;
  const filterList = checkSameContact();

  return (
    <div className={appCSS.main_container}>
      <Section
        title={'Phonebook'}
        styles={{ title: 'phonebook-title', container: 'first-container' }}
      >
        <ContactForm onSubmit={addContactToList} />
      </Section>

      <Section
        title={'Contacts'}
        styles={{ title: 'contact-title', container: 'second-container' }}
      >
        <Filter value={filterQuery} filterContacts={filterContacts} />
        {contactsCount ? (
          <ContactList filterList={filterList} onRemoveItem={onRemoveContact} />
        ) : (
          <Notification message="Phonebook is empty" />
        )}
      </Section>
    </div>
  );
};
