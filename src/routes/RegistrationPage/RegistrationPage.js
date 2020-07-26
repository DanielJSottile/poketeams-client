  
import React from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';


const RegistrationPage = (props) => {

  const handleRegistrationSuccess = user => {
    const { history } = props
    history.push('/landing')
  }
    return (
      <div className="registration-form-container">
        <RegistrationForm
          onRegistrationSuccess={handleRegistrationSuccess}
        />
      </div>
    );
};

export default RegistrationPage;