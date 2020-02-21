import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Typography,
  TextField,
  Link as HyperLink,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '../../components/Generic';
import { Visibility, VisibilityOff } from '../../components/icons';
import style from './Login.module.css';

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

const LoginView = (props) => {
  const { register, handleSubmit, errors } = useForm({ mode: 'onChange' });
  const onSubmit = (data) => console.log(data);
  const { toggleView, ...extraProps } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((currentValue) => !currentValue);
  };

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        {...extraProps}
        className={style.form}
      >
        <StyledTextField
          name="Email"
          label="Email"
          variant="outlined"
          placeholder="Enter email address"
          fullWidth
          inputRef={register({
            required: 'Email address is compulsory',
            pattern: {
              value: EmailRegex,
              message: 'Invalid email address',
            },
          })}
          error={Boolean(errors.Email)}
          helperText={errors.Email && errors.Email.message}
        />
        <StyledTextField
          name="Password"
          label="Password"
          variant="outlined"
          placeholder="Enter Password here"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          inputRef={register({ required: 'Password field is compulsory' })}
          error={Boolean(errors.Password)}
          helperText={errors.Password && errors.Password.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  className={style.icon}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <StyledButton type="submit" fullWidth>
          <Typography variant="button">Login</Typography>
        </StyledButton>
      </form>
      <HyperLink align="center" href="/forgot-password">
        <Typography variant="subtitle1">Forgot Password</Typography>
      </HyperLink>
      {/*
        GOOD-TO-HAVE : ADD Third Party Login Integration
      <div align="center" className="thirdPartyLogin">
        { 
          TODO : Integrate Google Login here.
        }
        <StyledButton>
          <Typography variant="button">Google</Typography>
        </StyledButton>
        {
          TODO : Integrate Facebook Login here.
        }
        <StyledButton>
          <Typography variant="button">Facebook</Typography>
        </StyledButton>
      </div>
      */}
      <HyperLink onClick={toggleView}>
        <Typography variant="subtitle2" align="center">
          New User ? Sign Up
        </Typography>
      </HyperLink>
    </React.Fragment>
  );
};

/* 
  TODO : Implement SignUp View
*/
const SignUpView = (props) => {
  const { toggleView } = props;

  return <p toggleView={toggleView}>SignUp View</p>;
};

const Login = (props) => {
  const [isRegistered, setisRegistered] = useState(true);
  const toggleView = () => setisRegistered(!isRegistered);

  return (
    <section className={style.rootContainer}>
      <a href="/" className={style.logoWrapper}>
        <img
          className={style.logo}
          src={process.env.PUBLIC_URL + '/logo.png'}
          alt="Website logo"
        />
      </a>
      <div className={style.mainView}>
        {isRegistered ? (
          <LoginView toggleView={toggleView} />
        ) : (
          <SignUpView toggleView={toggleView} />
        )}
      </div>
    </section>
  );
};

export default Login;
