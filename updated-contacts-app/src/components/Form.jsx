
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAddContact } from '../services/tanStack';

export default function Form() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: 'all' });

  const addContactMutation = useAddContact();

  const handleFormSubmit = (data) => {
    if (!isValid) return;
    addContactMutation.mutate(data, {
      onSuccess: () => history.push('/')
    });
  };

  return (
    <form id="contact-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          type="text"
          {...register('first_name', { required: 'Name is required' })}
        />
        <input
          placeholder="Last"
          type="text"
          {...register('last_name', { required: 'Last Name is required' })}
        />
      </p>
      <label>
        <span>Email</span>
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: 'Email is required' })}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://avatar..."
          type="text"
          {...register('avatar')}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}
