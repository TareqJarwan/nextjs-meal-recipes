// Packages
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

// Styles
import classes from '../../styles/Button.module.scss';

function ButtonWithLink({ link = '/', children, variant = 'secondary' }) {
  return (
    <Link
      href={link}
      type="button"
      className={`${classes.button} ${classes[`variant__${variant}`]}`}
    >
      {children}
    </Link>
  );
}
function Button({
  children,
  variant = 'secondary',
  className,
  onClickHandler,
}) {
  return (
    <button
      type="button"
      className={clsx(
			  classes.button,
			  classes[`variant__${variant}`],
			  className,
      )}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}

export default ButtonWithLink;
export { Button };
