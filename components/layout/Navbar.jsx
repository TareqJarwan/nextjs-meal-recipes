// Packages
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Images
import logo from '../../images/meal_khuj_logo.png';

// Styles
import classes from '../../styles/Navbar.module.scss';

function Navbar() {
  return (
    <nav className={classes.navbar}>
      <Link href="/" className={classes.logo}>
        <Image src={logo} alt="meal-khuj logo" />
      </Link>
      <ul className={classes.navLinks}>
        <li>
          <Link href="/meals">Meals</Link>
        </li>
        <li>
          <Link href="/savedMeals">Saved List</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
