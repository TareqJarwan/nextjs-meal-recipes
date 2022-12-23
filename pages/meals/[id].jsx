// Packages
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { BeatLoader } from 'react-spinners';
import Image from 'next/image';
import { FaHeartBroken, FaHeart } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

// Components
import Text from '../../components/text/Text';
import { Button } from '../../components/button/Button';
import Title from '../../components/text/Title';
import PointText from '../../components/text/PointText';
import IngredientsTable from '../../components/mealsPage/IngredientsTable';

// API
import { getSingleMeal } from '../../api';

// Styles
import classes from '../../styles/meals.module.scss';

function MealItem() {
  const [isSaved, setIsSaved] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const {
    data, isLoading, isError, error,
  } = useQuery(['singleMeal', id], getSingleMeal);

  const handleSaveButtonClick = async () => {
    const savedMeals = JSON.parse(localStorage.getItem('savedMeals'));
    if (!isSaved) {
      savedMeals.push(data.idMeal);
      localStorage.setItem('savedMeals', JSON.stringify(savedMeals));
      toast.success('Meal saved successfully');
      setIsSaved(true);
    } else {
      savedMeals.splice(savedMeals.indexOf(data.idMeal), 1);
      localStorage.setItem('savedMeals', JSON.stringify(savedMeals));
      setIsSaved(false);
      toast.error('Meal Removed successfully');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('savedMeals')) {
      const savedMeals = JSON.parse(localStorage.getItem('savedMeals'));
      if (savedMeals.includes(id)) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    } else {
      localStorage.setItem('savedMeals', JSON.stringify([]));
    }
  }, [id]);

  if (isError) {
    return (
      <Text>
        Error:
        {' '}
        {error.message}
      </Text>
    );
  }

  if (isLoading || !data) {
    return (
      <BeatLoader color="#fff" size={20} />
    );
  }

  const ingredients = Object.keys(data)
    .filter((key) => key.startsWith('strIngredient'))
    .filter((key) => data[key] !== '' && data[key] !== null);

  const ingredientsWithMeasures = ingredients.map((key, index) => ({
    index: index + 1,
    ingredient: data[key],
    measure: data[`strMeasure${index + 1}`],
  }));

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.topContainer}>
        <div className={classes.img}>
          <Image src={data.strMealThumb} height={300} width={300} alt={data.strMeal} />
        </div>
        <div className={classes.info}>
          <Title variant="primary">{data.strMeal}</Title>
          <PointText className={classes.infoText}>
            Category:
            {' '}
            {data.strCategory}
          </PointText>
          <PointText className={classes.infoText}>
            Area:
            {' '}
            {data.strArea}
          </PointText>
          <PointText className={classes.infoText}>
            tags:
            {' '}
            {data?.strTags?.split(',').join(', ')}
          </PointText>
          {isSaved && (
            <Text className={classes.greenText}>You already saved the meal.</Text>
          )}
          <Button variant="primary" className={classes.saveButton} onClickHandler={handleSaveButtonClick}>
            {isSaved ? (
              <>
                <FaHeartBroken />
                {' '}
                Remove
              </>
            ) : (
              <>
                <FaHeart className={classes.saveIcon} />
                { ' '}
                save
              </>
            ) }
          </Button>
        </div>
      </div>

      <div className={classes.ingredientsTable}>
        <IngredientsTable ingredientsWithMeasures={ingredientsWithMeasures} />
      </div>

      <div className={classes.instructions}>
        <Title>Instructions</Title>
        {data.strInstructions.split('.').filter((sentence) => sentence !== '').map((sentence) => (
          <PointText key={sentence}>
            {sentence}
            .
          </PointText>
        ))}
      </div>
    </div>
  );
}

export default MealItem;
