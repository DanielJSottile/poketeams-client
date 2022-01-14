import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import PokeTeamsLogo from '../../Images/PokeTeams.png';
import Image from '../Image';
import styles from './Footer.module.scss';

const Footer: FunctionComponent = () => {
  return (
    <footer>
      <Image
        imageClass={styles['small-logo-image']}
        src={PokeTeamsLogo}
        alt="PokeTeams Logo"
      />
      <span>{`Created by Daniel Sottile || © August 2021 || Pokémon is © 1995-2021 Nintendo`}</span>
      <div>
        <Link className={styles['no-styling']} to={'/privacy-policy'}>
          Privacy Policy
        </Link>{' '}
        ||{' '}
        <Link className={styles['no-styling']} to={'/terms-and-conditions'}>
          Terms and Conditions
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
