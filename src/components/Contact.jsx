import React from 'react';

function Contact({contact, id, editContact}) {
  return (
    <div onClick={() => {
      editContact({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        id
      });
    }}>
      {contact.name}
      <button></button>
    </div>
  )
}

export default Contact;