// Packages
import React from 'react';
import clsx from 'clsx';

// Components
import Text from './Text';

// Styles
import classes from '../../styles/PointText.module.scss';

function PointText({ children, className }) {
  return (
    <div className={clsx(classes.pointText, className)}>
      <div className={classes.circle} />
      <Text className={classes.text}>{children}</Text>
    </div>
  );
}

export default PointText;
