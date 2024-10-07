import { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import './index.scss';
import { getUserProfile, logUserIn } from '../../store/api/user';
import { getIsLoggedIn, getIsLoggingIn, getLoginMessage } from '../../store/selectors/user';
import { setIsLoggingIn, setLoginMessage } from '../../store/actions/user';


const formContentInit = {
  email: '',
  password: '',
};

function Login() {
  const dispatch = useDispatch();
  const isLoggingIn = useSelector(getIsLoggingIn);
  const loginMessage = useSelector(getLoginMessage);
  const [formContent, setFormContent] = useState({ ...formContentInit });

  const handleInputChange = (e) => {
    dispatch(setLoginMessage(''));
    const { name, value } = e.target;
    setFormContent((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setIsLoggingIn(true));
    const formData = new FormData(e.target);
    dispatch(logUserIn(formData));
  };

  const handleRegisterClicked = async (e) => {
    dispatch(getUserProfile());
  };

  return (
    <div className='login'>
      <form
        onSubmit={handleSubmit}
        disabled={isLoggingIn ? true : false}
      >
        <div className='login-inputs'>
          <label>
            Email
            <input
              type='email'
              name='email'
              value={formContent.email}
              placeholder='john.doe@email.com'
              required
              onChange={handleInputChange}
              autoComplete='email'
            />
          </label>
          <label>
            Password
            <input
              type='password'
              name='password'
              value={formContent.password}
              required
              onChange={handleInputChange}
              autoComplete='current-password'
            />
          </label>
        </div>
        <div className='login-buttons'>
          <button type='submit'>Log me in</button>
          <button onClick={handleRegisterClicked}>Register</button>
        </div>
      </form>
      <p className='login-message'>{loginMessage}</p>
    </div>
  );
}

export default Login;
