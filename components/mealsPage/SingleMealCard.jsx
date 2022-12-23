// Packages
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Components
import Title from '../text/Title';

// Styles
import classes from '../../styles/SingleMealCard.module.scss';

function SingleMealCard({ meal }) {
  return (
    <Link href={`/meals/${meal.idMeal}`} className={classes.item}>
      <Image src={meal.strMealThumb} alt={meal.strMeal} width={100} height={200} />
      <Title className={classes.title} variant="secondary">{meal.strMeal}</Title>
    </Link>
  );
}

export default SingleMealCard;
