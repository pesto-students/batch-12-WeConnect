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
  const { toggleView, ...extraProps } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const { register, handleSubmit, errors } = useForm({ mode: 'onChange' });
  const handleClickShowPassword = () => {
    setShowPassword((currentValue) => !currentValue);
  };
  const onSubmit = (data) => {};

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        {...extraProps}
        className={style.form}
      >
        <StyledTextField
          name="email"
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
          error={Boolean(errors.email)}
          helperText={errors.email && errors.email.message}
        />
        <StyledTextField
          name="password"
          label="Password"
          variant="outlined"
          placeholder="Enter Password here"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          inputRef={register({ required: 'Password field is compulsory' })}
          error={Boolean(errors.Password)}
          helperText={errors.Password && errors.password.message}
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
  const { toggleView, ...extraProps } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const { register, handleSubmit, watch, triggerValidation, errors } = useForm({
    mode: 'onChange',
  });
  const watchPassword = watch('password', '');
  const handleClickShowPassword = () => {
    setShowPassword((currentValue) => !currentValue);
  };
  const onSubmit = (data) => {};

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        {...extraProps}
        className={style.form}
      >
        <StyledTextField
          name="email"
          label="Email"
          variant="outlined"
          placeholder="Enter email address here"
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
        />
        <StyledTextField
          name="password"
          label="Password"
          variant="outlined"
          placeholder="Enter Password here"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          inputRef={register({ required: 'Password field is compulsory' })}
          error={Boolean(errors.password)}
          helperText={errors.password && errors.password.message}
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
          onChange={() => {
            triggerValidation('confirmPassword');
          }}
        />
        <StyledTextField
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          placeholder="Retype your password"
          fullWidth
          type="password"
          inputRef={register({
            required: 'Retype your password here',
            validate: {
              match: (value) =>
                value === watchPassword ? true : 'Passwords are not matching',
              message: 'Invalid Password',
            },
          })}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword && errors.confirmPassword.message}
        />
        <StyledButton type="submit" fullWidth>
          <Typography variant="button">Signup</Typography>
        </StyledButton>
      </form>
      <HyperLink onClick={toggleView}>
        <Typography variant="subtitle2" align="center">
          Already have an account ? Login
        </Typography>
      </HyperLink>
    </React.Fragment>
  );
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
