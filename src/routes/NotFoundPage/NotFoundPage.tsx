import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

// Component

const NotFoundPage = (props: any): JSX.Element => {
  // Final Render

  return (
    <div className={styles['not-found-background']}>
      <h1 className={styles['ohno']}>Oh No! 404 Not Found!</h1>
      <img
        src={require('../../Images/dizzy-pikachu-shuffle.png')}
        alt="dizzy-pikachu-shuffle"
      />
      <h2 className={styles['statement']}>Page Not Found. Please Go back.</h2>
      <Link className={styles['go-back']} to={'/'}>
        Go To PokéTeams <i className="fas fa-home"></i>
      </Link>
    </div>
  );
};

export default NotFoundPage;
