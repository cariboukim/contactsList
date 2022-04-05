import React from 'react';
import Contact from './Contact.jsx';

function List({contacts, editContact}) {

  return (
    <div>
      {!contacts?
      <span>Add contacts to list!</span>
      :
      contacts.map((contact, id) => (
        <Contact contact={contact} key={id} id={id} editContact={editContact}/>
      ))
      }
    </div>
  )
}

export default List;