import React from 'react';
import WeGrid from '../../components/Generic/Grid/Grid';
import Checkbox from '../../components/Generic/Checkbox';
import FormControlLabel from '../../components/Generic/FormControlLabel';

const FilterCheckBox = (props) => {
  const handleCheck = (event) => {
    const checked = event.target.checked;
    props.checked.setCheck(checked);
  };
  return (
    <WeGrid item sm={1} xs={6} spacing={3}>
      <FormControlLabel
        control={
          <Checkbox
            checked={Boolean(props.isChecked.check)}
            value="check"
            color="primary"
            onClick={handleCheck}
          />
        }
        label={props.value}
      />
    </WeGrid>
  );
};

export default FilterCheckBox;
