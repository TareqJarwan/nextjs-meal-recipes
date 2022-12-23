// Packages
import React from 'react';
import { BeatLoader } from 'react-spinners';

// Components
import CategoryItem from './CategoryItem';

// Styles
import classes from '../../styles/Categories.module.scss';

export default function Categories({
  setSelectedCategory,
  selectedCategory,
  categoryIsLoading,
  categoryIsError,
  categoryError,
  categories,
  setQuery,
}) {
  if (categoryIsLoading) {
    return <BeatLoader loading={categoryIsLoading} color="#fff" />;
  }
  if (categoryIsError) {
    return (
      <div>
        Error:
        {categoryError.message}
      </div>
    );
  }

  return (
    <div className={classes.categories__container}>
      {categories?.map((item) => (
        <CategoryItem
          key={item.idCategory}
          category={item}
          onClickHandler={() => {
					  setSelectedCategory(item.strCategory);
					  setQuery('');
          }}
          selectedCategory={selectedCategory}
        />
      ))}
    </div>
  );
}
