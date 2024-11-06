import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss';
import { loginWithCredentials } from '../../../store/api/user';
import { getIsLoggingIn } from '../../../store/selectors/user';
import { setLoginMessage } from '../../../store/actions/user';


const formContentInit = {
  username: '',
  password: '',
};

function Login() {
  const dispatch = useDispatch();
  const isLoggingIn = useSelector(getIsLoggingIn);
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
    const formData = new FormData(e.target);
    dispatch(loginWithCredentials(formData));
  };

  const handleRegisterClicked = async (e) => {
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <div className='login-inputs'>
          <label>
            Email
            <input
              type='email'
              name='username'  // OAuth2 expects a 'username' key
              value={formContent.username}
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
          <button
            type='submit'
            disabled={isLoggingIn ? true : false}
          >
            Log me in
          </button>
          <button
            onClick={handleRegisterClicked}
            disabled={isLoggingIn ? true : false}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
