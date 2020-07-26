import React, { useState } from 'react'
import { Button, Input, Required } from '../Utils/Utils'
import AuthApiService from '../../services/auth-api-service'

const RegistrationForm = (props) => {

  const [state, setState] = useState({error: null});

  const handleSubmit = ev => {
    ev.preventDefault()
    const {user_name, password } = ev.target

    setState({error: null});

     AuthApiService.postUser({
       user_name: user_name.value,
       password: password.value,
     })
    .then(user => {
    user_name.value = ''
    password.value = ''
    props.onRegistrationSuccess()
    })
    .catch(res => {
      setState(oldVals => ({...oldVals, error: res.error}));
    })
  }

  return (
    <form
      className='RegistrationForm'
      onSubmit={handleSubmit}
    >
      <div role='alert'>
        {state.error && <p className='red'>{state.error}</p>}
      </div>
      <div className='user_name'>
        <label htmlFor='RegistrationForm__user_name'>
          User name <Required />
        </label>
        <Input
          name='user_name'
          type='text'
          required
          id='RegistrationForm__user_name'>
        </Input>
      </div>
      <div className='password'>
        <label htmlFor='RegistrationForm__password'>
          Password <Required />
        </label>
        <Input
          name='password'
          type='password'
          required
          id='RegistrationForm__password'>
        </Input>
      </div>
      <Button type='submit'>
        Register
      </Button>
    </form>
  )
}

export default RegistrationForm;