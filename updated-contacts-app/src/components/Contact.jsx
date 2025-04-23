
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useContactDetails, useDeleteContact } from '../services/tanStack';

export default function Contact() {
  const { contactId } = useParams();
  const history = useHistory();
  const { data: contact, isLoading } = useContactDetails(contactId);
  const deleteContactMutation = useDeleteContact();

  const handleDelete = () => {
    deleteContactMutation.mutate(contactId, {
      onSuccess: () => history.push('/')
    });
  };

  if (isLoading) return 'loading...';

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || ''} />
      </div>
      <div>
        <h1 data-testid="full_name">
          {contact.first_name || contact.last_name ? (
            <>
              {contact.first_name} {contact.last_name}
            </>
          ) : <i>No Name</i>}
        </h1>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
