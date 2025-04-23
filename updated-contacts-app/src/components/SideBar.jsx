
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useContacts } from '../services/tanStack';

export default function SideBar() {
  const { data: contacts = [], isLoading } = useContacts();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div id="sidebar">
      <h1>WiTech Contacts</h1>
      <div>
        <Link to="/contacts/new"><button>New</button></Link>
        <Link to="/"><button>Home</button></Link>
      </div>
      <nav>
        {contacts.length ? (
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>
                <NavLink
                  to={`/contacts/${contact.id}`}
                  data-testid="contact"
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  {contact.first_name} {contact.last_name}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : <p>No contacts found</p>}
      </nav>
    </div>
  );
}
