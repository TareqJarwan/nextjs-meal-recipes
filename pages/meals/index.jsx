// Packages
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BeatLoader } from 'react-spinners';

// Components
import SearchBar from '../../components/mealsPage/SearchBar';
import PointText from '../../components/text/PointText';
import Categories from '../../components/category/Categories';
import Text from '../../components/text/Text';
import SingleMealCard from '../../components/mealsPage/SingleMealCard';

// API
import { getCategories, getMeals, getQueriedMeals } from '../../api';

// Styles
import classes from '../../styles/meals.module.scss';

const override = {
  display: 'inline-block',
  margin: '0 auto',
};

function Meals() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');

  const {
    data: categories,
    isError: categoriesIsError,
    isLoading: categoriesIsLoading,
    error: categoriesError,
  } = useQuery(['categories'], getCategories);

  const { data, isLoading, isError } = useQuery(['mealsByCategory', selectedCategory], getMeals, {
    enabled: query === '',
  });

  const {
    data: queriedData, isLoading: queryIsLoading, isError: queryError,
  } = useQuery(['mealsByQuery', query], getQueriedMeals, {
    enabled: query !== '',
  });

  useEffect(() => {
    if (categories) {
      setSelectedCategory(categories[0].strCategory);
    }
  }, [categories]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchText) {
        setQuery(searchText);
        setSelectedCategory('');
      } else {
        setQuery('');
        if (categories) {
          setSelectedCategory(categories[0].strCategory);
        }
      }
    }, 300);
    return () => {
      setQuery('');
      clearTimeout(timeout);
    };
  }, [categories, searchText]);

  return (
    <div className={classes.meals__page}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <PointText className={classes.text}>
        search meals or select categories from below.
      </PointText>

      <Categories
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        categories={categories}
        categoryIsLoading={categoriesIsLoading}
        categoryIsError={categoriesIsError}
        categoryError={categoriesError}
        setQuery={setQuery}
      />

      {isLoading || categoriesIsLoading ? (
        <div className={classes.loadingSpinner}>
          <BeatLoader color="#fff" loading={isLoading || categoriesIsLoading} cssOverride={override} size={20} />
        </div>
      ) : null}

      <div className={classes.meals__container}>
        {!isLoading && !isError && data?.map((meal) => (
          <SingleMealCard meal={meal} key={meal.idMeal} />
        ))}

        { !queryIsLoading && !queryError
        && queriedData?.map((meal) => (
          <SingleMealCard key={meal.idMeal} meal={meal} />
        ))}

        {data && queriedData && data.length === 0 && queriedData.length === 0 && (
          <Text>No meals found</Text>
        )}
      </div>
    </div>
  );
}

export default Meals;
