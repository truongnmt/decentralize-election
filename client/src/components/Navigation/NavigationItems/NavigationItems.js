import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Nav 1</NavigationItem>
        <NavigationItem link="#">Nav 2</NavigationItem>
        <NavigationItem link="#">Nav 3</NavigationItem>
    </ul>

);

export default navigationItems;