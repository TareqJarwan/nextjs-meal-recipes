// Packages
import React from 'react';
import Image from 'next/image';

// Components
import Text from '../text/Text';

// Images
import Logo from '../../images/meal_khuj_logo_primary.png';

// Styles
import classes from '../../styles/Footer.module.scss';

function Footer() {
  return (
    <footer className={classes.footer}>
      <Image src={Logo} alt="meal-khuj logo" />
      <Text>Find the perfect meal recipe for you</Text>
      <Text className={classes.copyright}>
        © “My-Meals” 2022 All right reserved.
      </Text>
    </footer>
  );
}

export default Footer;
