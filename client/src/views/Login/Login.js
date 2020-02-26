import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {Redirect} from 'react-router-dom';
import {
  Typography,
  TextField,
  Link as HyperLink,
  InputAdornment,
  IconButton,
  Snackbar
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '../../components/Generic';
import { Visibility, VisibilityOff } from '../../components/icons';
import { authenticateUser } from '../../apis/auth';
import { registerUser } from '../../apis/signup';
import style from './Login.module.css';
import AuthContext from '../../store/authContext';



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
  const { toggleView, notify, ...extraProps } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const { register, handleSubmit, errors } = useForm({ mode: 'onChange' });
  const { setUserAuthStatus } = useContext(AuthContext);

  const handleClickShowPassword = () => {
    setShowPassword((currentValue) => !currentValue);
  };

  const onSubmit = async (data) => {
    const isValidCredentials = await authenticateUser(data);
    setUserAuthStatus(isValidCredentials);
    if (isValidCredentials) {
      notify({
        display:true,
        severity:'success',
        text:'Your login has been successful'
      });
    }
    else{
      notify({
        display: true,
        severity: 'error',
        text: 'Given username/password are invalid'
      });
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


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
  const { toggleView, notify, ...extraProps } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const { register, handleSubmit, watch, triggerValidation, errors } = useForm({
    mode: 'onChange',
  });
  const userRoleOptions = [
    { label: 'Customer', value: '1' },
    { label: 'Owner', value: '2' },
  ];
  const watchPassword = watch('password', '');
  const handleClickShowPassword = () => {
    setShowPassword((currentValue) => !currentValue);
  };
  
  const onSubmit = (data) => { 
    try{
      registerUser(data, notify);
      window.location.href="/";
    }
    catch(error) {
      notify({
        display:true,
        severity:'error',
        text:'Some error occured. Please retry again'
      });
    }
  }

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        {...extraProps}
        className={style.form}
      >
        <StyledTextField
          name="firstName"
          label="First name"
          variant="outlined"
          placeholder="First name"
          fullWidth
          inputRef={register({
            required: 'First name is required',
          })}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName && errors.firstName.message}
        />
        <StyledTextField
          name="lastName"
          label="Last Name"
          variant="outlined"
          placeholder="Last name"
          fullWidth
          inputRef={register({})}
        />
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
        <StyledTextField
          name="phone"
          label="Contact Number"
          variant="outlined"
          placeholder="Enter contact number"
          fullWidth
          type="tel"
          inputRef={register({
            required: 'Contact number is missing',
          })}
        ></StyledTextField>

        <StyledTextField
          name="role"
          label="Role"
          select
          variant="outlined"
          placeholder="Select your role"
          fullWidth
          inputRef={register({
            required: 'Select a role from existing ones.',
          })}
          SelectProps={{
            native: true,
          }}
          error={Boolean(errors.userRole)}
          helperText={errors.userRole && errors.userRole.message}
        >
          {userRoleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledTextField>
        <StyledButton type="submit" fullWidth>
          <Typography variant="button">Signup</Typography>
        </StyledButton>
      </form>
      <HyperLink onClick={toggleView}>
        <Typography variant="subtitle2" align="center">
          Already have an account ?
        </Typography>
      </HyperLink>
      <div className={style.spacer} />
    </React.Fragment>
  );
};


const Login = (props) => {
  const [isRegistered, setisRegistered] = useState(true);
  const [notification, setNotification] = useState({
    'display': false,
    'severity': null,
    'text': ''
  });
  const toggleView = () => setisRegistered(!isRegistered);
  const { userAuthStatus } = useContext(AuthContext);
  
  if (userAuthStatus) {
    return <Redirect to="/" />;
  }

    
  return (
    <section className={style.rootContainer}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={Boolean(notification.display)}
        autoHideDuration={4000}
        onClose={() => setNotification({'display': false})}
        message={notification.text}
        severity={notification.severity}
      />
      <a href="/" className={style.logoWrapper}>
        <img
          className={style.logo}
          src={process.env.PUBLIC_URL + '/logo.png'}
          alt="Website logo"
        />
      </a>
      <div className={style.mainView}>
        {isRegistered ? (
          <LoginView toggleView={toggleView} notify={setNotification} />
        ) : (
          <SignUpView toggleView={toggleView} notify={setNotification} />
        )}
      </div>
    </section>
  );
};

export default Login;
