import React, {useState, useEffect} from 'react';
import axios from 'axios';
import List from './List.jsx';
import Input from './Input.jsx';

function App() {

  const [contacts, setContacts] = useState([]);
  const [add, setAdd] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  useEffect(() => {
    getRequest();
  }, [])

  const getRequest = async () => {
    try {
      const result = await axios.get('http://localhost:4000/api/get');
      // console.log('in async GET', result.data);
      setContacts(result.data);
    } catch (e) {
      console.error(e);
    }
  }

  const createContact = (e, contact) => {
    e.preventDefault();
    console.log('on addContact click', contact);
    const post = async () => {
      try {
        await axios.post('http://localhost:4000/api/post', contact);
        getRequest();
      } catch (e) {
        console.error(e);
      }
    }

    post();
  }

  const editContact = (contact) => {
    console.log('name clicked', contact);
    setAdd(false);
    setCurrentContact(contact);
  }

  const updateContact = (e, contact) => {
    e.preventDefault();
    const update = async () => {
      try {
        await axios.put('http://localhost:4000/api/update', contact)
        getRequest();
      } catch (e) {
        console.error(e);
      }
    }

    update();
  }

  return (
    <div className="container">
      <div className="left">
        <button onClick={() => {
          setAdd(!add);
          setCurrentContact(null);
          console.log('on Add Contact click', add);
        }}>Add Contact</button>
        <List contacts={contacts} editContact={editContact}/>
      </div>
      <div className="right">
        {add || currentContact ? <Input createContact={createContact} currentContact={currentContact} updateContact={updateContact}/> : null}
      </div>
    </div>
  )
}

export default App;