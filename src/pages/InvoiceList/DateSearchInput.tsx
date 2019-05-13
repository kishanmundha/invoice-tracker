import React from 'react';
import { withStyles, Input } from '@material-ui/core';

const styles = (theme: any) => ({
  searchIcon: {
    marginLeft: 20,
    marginRight: -12,
  },
  searchInputRoot: {
    color: 'inherit',
  },
  searchInputUnderline: {
    '&:before': {
      borderBottomColor: 'rgba(255, 255, 255, 0.42)',
    },
    '&:after': {
      borderBottomColor: theme.palette.common.white,
    },
  },
})

interface IProps {
  classes?: any;
  value: string;
  onChange: (event: any) => void;
}

class DateSearchInput extends React.Component<IProps> {
  state = {
    type: 'text',
  }

  render() {
    const { classes, value, onChange } = this.props;
    return (
      <Input
        placeholder="Filter by date"
        classes={{
          root: classes.searchInputRoot,
          underline: classes.searchInputUnderline,
        }}
        value={value}
        onChange={onChange}
        type={this.state.type}
        onFocus={() => this.setState({ type: 'date' })}
        onBlur={() => this.setState({ type: 'text' })}
      />
    );
  }
}

export default withStyles(styles)(DateSearchInput);
