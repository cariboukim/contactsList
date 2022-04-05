import React from 'react';

function Contact({contact, id, editContact, deleteContact}) {
  return (
    <div>
      <span onClick={() => {
        editContact({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          id
        });
      }}>{contact.name}</span>
      <button onClick={() => {
        deleteContact(id);
      }}>X</button>
    </div>
  )
}

export default Contact;