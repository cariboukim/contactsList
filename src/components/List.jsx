import React from 'react';
import Contact from './Contact.jsx';

function List({contacts, editContact, deleteContact}) {

  return (
    <div>
      {contacts.length === 0 ?
      <span>Add contacts to list!</span>
      :
      contacts.map((contact, id) => (
        <Contact contact={contact} key={id} id={id} editContact={editContact} deleteContact={deleteContact}/>
      ))
      }
    </div>
  )
}

export default List;