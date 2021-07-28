import React, { FunctionComponent } from 'react';
import Image from '../Image';
import PokeTeamsLogo from '../../Images/PokeTeams.png';
import styles from './Footer.module.scss';

const Footer: FunctionComponent = () => {
  return (
    <footer>
      <Image
        imageClass={styles['small-logo-image']}
        src={PokeTeamsLogo}
        alt="PokeTeams Logo"
      />
      <span>{`Created by Daniel Sottile || © July 2021 || Pokémon is © 1995-2021 Nintendo`}</span>
    </footer>
  );
};

export default Footer;
