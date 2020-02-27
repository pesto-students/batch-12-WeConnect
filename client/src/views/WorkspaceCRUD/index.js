import React, { useEffect } from 'react';
import WeGrid from '../../components/Generic/Grid/Grid';
import WeTextField from '../../components/Generic/TextField/TextField';
import WeButton from '../../components/Generic/Button/Button';
import { getOwnerWorkplace } from '../../apis/getWorkSpace';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

import style from './workspaceCrud.module.css';

const WorkspaceCRUD = (props) => {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getOwnerWorkplace()
      .then((data) => {
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        //props.history.push('/');
      });
  }, []);

  return (
    <React.Fragment>
      <WeGrid container spacing={1} justify="center" alignItems="center">
        <WeGrid container item spacing={1} xs={12}>
          <WeGrid item xs={12}>
            <h1 className={style.heading}>
              {loading ? <HourglassEmptyIcon /> : 'Add Your workspace : '}
            </h1>
          </WeGrid>
        </WeGrid>
        <WeGrid container item spacing={1} xs={6}>
          <WeGrid item xs={12}>
            <WeTextField
              className={style.textField}
              required
              id="standard-required"
              label="Required"
              defaultValue="Workspace Name"
            />
          </WeGrid>
          <WeGrid item xs={12}>
            <WeTextField
              className={style.textField}
              required
              id="standard-required"
              label="Required"
              defaultValue="Full Address"
            />
          </WeGrid>
          <WeGrid item xs={12}>
            <WeTextField
              className={style.textField}
              required
              id="standard-required"
              label="Required"
              defaultValue="Locality"
            />
          </WeGrid>
          <WeGrid item xs={12}>
            <WeTextField
              className={style.textField}
              required
              id="standard-required"
              label="Required"
              defaultValue="Pincode"
            />
          </WeGrid>
          <WeGrid item xs={12}>
            <WeTextField
              className={style.textField}
              required
              id="standard-required"
              label="Required"
              defaultValue="Location"
            />
          </WeGrid>
          <WeGrid item xs={12}>
            <WeTextField
              className={style.textField}
              required
              id="standard-required"
              label="Required"
              defaultValue="Operation Hours"
            />
          </WeGrid>
          <WeGrid item xs={12}>
            <WeTextField
              className={style.textField}
              required
              id="standard-required"
              label="Required"
              defaultValue="Workspace Amenities"
            />
          </WeGrid>
          <WeGrid item xs={12}>
            <WeButton variant="contained" color="primary">
              Submit
            </WeButton>
          </WeGrid>
        </WeGrid>
      </WeGrid>
    </React.Fragment>
  );
};

export default WorkspaceCRUD;
