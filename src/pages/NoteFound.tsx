import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, Button, Icon } from '@material-ui/core';

const NotFoundComponent = () => (
  <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Paper style={{ padding: 16, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h4">Sorry, Page you are looking for not found</Typography>
      <div style={{ marginTop: 16 }}>
        <Button variant="outlined" color="primary" component={Link} {...{ to: "/" } as any}>
          <Icon>home</Icon>
          &nbsp;Go to home
      </Button>
      </div>
    </Paper>
  </div>
);

export default NotFoundComponent;
