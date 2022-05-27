import logo from './logo.svg';
import './App.css';
import contact from "./contacts.json";
import {useState} from 'react'

function App() {

  const [contactList, setContactList] = useState(contact.splice(0,5))
  const randomContacts = contact.slice(6, contact.length)

  const getRandomContact = () => {
    const newRandomContact = randomContacts.splice(Math.floor(Math.random() * (randomContacts.length)), 1)
    const newContactList = contactList.concat(newRandomContact)
    setContactList(newContactList);
  }

const sortByPopularity = () => {
  const orderPopularity = [...contactList.sort((a,b) => (a.popularity < b.popularity) ? 1 : -1)];

  setContactList(orderPopularity);
}


  const sortByName = () => {
    const nameSort = [...contactList.sort((a,b) => a.name.localeCompare(b.name)) ]
    setContactList(nameSort)
  }

  const deleteContact = contactId => {
    const filteredContact = contactList.filter(contact => {
      return contact.id !== contactId
    })
    setContactList(filteredContact)
    //setContactList(contactList.filter(contact => contact.id === removeId))
  }

  return (
    <div className="App">
        <h1>IronContacts</h1>
        <div className='Main-btns'>
          <button className='btn-space'onClick={getRandomContact}>Add Random Contact</button>
          <button className='btn-space' onClick={sortByPopularity}>Sort by Popularity</button>
          <button id='btn-space' onClick={sortByName}>Sort by Name</button>
        </div>
        <table>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th className='thspacing'>Won <br/> Oscar</th>
            <th className='thspacing'>Won <br/> Emmy</th>
            <th>Actions</th>
          </tr>

          {contactList.map( contact => {
            return (
              <tr>
                  <td><img src={contact.pictureUrl} alt='actor' className='pictureActor'/></td>
                  <td>{contact.name}</td>
                  <td>{contact.popularity.toFixed(2)}</td>
                  <td >{contact.wonOscar ? <span>🏆</span> : <span> </span>}</td>
                  <td>{contact.wonEmmy ? <span>🏆</span> : <span> </span>}</td>
                  <td><button onClick={() => deleteContact(contact.id)}>Delete</button></td>
              </tr>
            )
          })
        }

        </table>
    </div>
  );
}

export default App;
