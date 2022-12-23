// Packages
import React from 'react';
import clsx from 'clsx';

// Styles
import classes from '../../styles/Text.module.scss';

function Text({ children, className }) {
  return <p className={clsx(classes.text, className)}>{children}</p>;
}

export default Text;
