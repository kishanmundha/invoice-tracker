import React from 'react';
import { Typography, AppBar, Toolbar, withStyles } from '@material-ui/core';

interface IProps {
  title: string;
  classes?: any;
  rightComponent?: any;
}

const styles = () => ({
})

const Header = (props: IProps) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
        {props.title}
      </Typography>
      <div>
        {props.rightComponent}
      </div>
    </Toolbar>
  </AppBar>
)

export default withStyles(styles)(Header);
