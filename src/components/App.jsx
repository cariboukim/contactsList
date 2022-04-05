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
      const result = await axios.get('/api/get');
      setContacts(result.data);
    } catch (e) {
      console.error(e);
    }
  }

  const createContact = (e, contact) => {
    e.preventDefault();
    const post = async () => {
      try {
        await axios.post('/api/post', contact);
        getRequest();
      } catch (e) {
        console.error(e);
      }
    }

    post();
  }

  const editContact = (contact) => {
    setAdd(false);
    setCurrentContact(contact);
  }

  const updateContact = (e, contact) => {
    e.preventDefault();
    const update = async () => {
      try {
        await axios.put('/api/update', contact)
        getRequest();
      } catch (e) {
        console.error(e);
      }
    }

    update();
  }

  const deleteContact = (id) => {
    const remove = async () => {
      try {
        await axios.delete(`api/delete?id=${id}`);
        getRequest();
        setCurrentContact(null);
        setAdd(false);
      } catch (e) {
        console.error(e);
      }
    }

    remove();
  }

  return (
    <div className="container">
      <div className="left">
        <button onClick={() => {
          setAdd(!add);
          setCurrentContact(null);
        }}>Add Contact</button>
        <List contacts={contacts} editContact={editContact} deleteContact={deleteContact}/>
      </div>
      <div className="right">
        {add || currentContact ? <Input createContact={createContact} currentContact={currentContact} updateContact={updateContact} deleteContact={deleteContact}/> : null}
      </div>
    </div>
  )
}

export default App;