import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Typography, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '../../components/Generic';
import style from '../Login/Login.module.css';
import getProfile from '../../apis/getProfile';
import updateProfile from '../../apis/updateProfile';
import ownStyle from './MyProfile.module.css';

const EmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const StyledTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'primary',
    },

    '& input.Mui-focused + fieldset': {
      color: 'blue',
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },

    '& input:invalid + fieldset': {
      color: 'red',
      borderWidth: 2,
    },
  },
})(TextField);

const StyledButton = withStyles({
  root: {
    background: 'white',
    padding: '1em',
  },
})(Button);

const MyProfile = (props) => {
  const [editable, setEditable] = useState(false);
  const [profileData, setProfileData] = useState();
  useEffect(() => {
    getProfile().then((response, error) => {
      setProfileData(response.data.user);
    });
  }, []);

  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    setEditable(!editable);
    if (editable) {
      await updateProfile(data);
    }
  };
  return (
    <div className={style.mainView}>
      {profileData ? (
        <React.Fragment>
          <h1>Profile</h1>
          <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <StyledTextField
              name="firstName"
              label="First Name"
              defaultValue={profileData.firstName}
              variant="outlined"
              placeholder="First Name"
              type="text"
              fullWidth
              ref={register}
              inputRef={register({ required: 'First Name is compulsory' })}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName && errors.firstName.message}
              disabled={!editable}
            />
            <StyledTextField
              name="lastName"
              label="Last Name"
              variant="outlined"
              defaultValue={profileData.lastName}
              placeholder="Last Name"
              type="text"
              fullWidth
              inputRef={register({ required: 'Last Name is compulsory' })}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName && errors.lastName.message}
              disabled={!editable}
            />
            <StyledTextField
              name="email"
              label="Email"
              variant="outlined"
              defaultValue={profileData.email}
              placeholder="Email address"
              fullWidth
              inputRef={register({
                required: 'Email address is compulsory',
                pattern: {
                  value: EmailRegex,
                  message: 'Invalid email address',
                },
              })}
              error={Boolean(errors.email)}
              helperText={errors.email && errors.email.message}
              disabled={!editable}
            />
            <StyledTextField
              name="phone"
              label="Phone"
              variant="outlined"
              defaultValue={profileData.phone}
              placeholder="Phone"
              type="tel"
              fullWidth
              inputRef={register({ required: 'Phone is compulsory' })}
              error={Boolean(errors.phone)}
              helperText={errors.phone && errors.phone.message}
              disabled={!editable}
            />

            <StyledButton type="submit">
              <Typography variant="button">
                {editable ? 'Save' : 'Edit'}
              </Typography>
            </StyledButton>
          </form>
        </React.Fragment>
      ) : (
        <img src="/loader.svg" alt="A loader SVG" className={ownStyle.loader} />
      )}
    </div>
  );
};

export default MyProfile;
// inputRef={register({
//   required: 'Email address is compulsory',
//   pattern: {
//     value: EmailRegex,
//     message: 'Invalid email address',
//   },
// })}
