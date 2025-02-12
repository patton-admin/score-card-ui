import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';  
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import blue from '@material-ui/core/colors/blue';

const styles = {
  root: {
    color: blue[600],
    '&$checked': {
      color: blue[500],
    },
  },
  checked: {},
};

class CheckboxItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleCheckboxChange = (event) => {
    const { checkboxChangeCallback } = this.props;
    checkboxChangeCallback(event.target.checked);
  };

  render() {
    const { classes, checkboxValue, checkboxLabel, checked } = this.props;
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={this.handleCheckboxChange}
            value={checkboxValue}
            classes={{
              root: classes.root,
              checked: classes.checked,
            }}
          />
        }
        label={checkboxLabel}
      />
    )
  }
}

export default withStyles(styles)(CheckboxItem);

