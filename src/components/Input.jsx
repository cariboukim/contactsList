import React, {useState, useEffect} from 'react';

function Input({createContact, currentContact, updateContact}) {

  // const [create, setCreate] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');


  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setEmail(currentContact.email);
      setPhone(currentContact.phone);
    } else {
      setName('');
      setEmail('');
      setPhone('');
    }
  }, [currentContact])

  return (
    <form onSubmit={(e) => {
      if (!currentContact) {
        createContact(e, {
          name,
          email,
          phone
        });
      } else {
        updateContact(e, {
          name,
          email,
          phone,
          id: currentContact.id
        })
      }
    }}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => {
        setName(e.target.value);
      }}></input><br />
      <input type="text" placeholder="Email" value={email} onChange={(e) => {
        setEmail(e.target.value);
      }}></input><br />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => {
        setPhone(e.target.value);
      }}></input><br />
      <button type="submit">{!currentContact ? 'Add Contact' : 'Update Contact'}</button>
    </form>
  )
}

export default Input;