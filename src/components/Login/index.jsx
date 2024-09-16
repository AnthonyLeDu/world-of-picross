import { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import './index.scss';
import { logUserIn } from '../../store/api/user';
import { getIsLoggedIn, getIsLoggingIn, getLoginMessage } from '../../store/selectors/user';
import { setLoginMessage } from '../../store/actions/user';


const formDataInit = {
  email: '',
  password: '',
};

function Login() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(getIsLoggedIn);
  const isLoggingIn = useSelector(getIsLoggingIn);
  const loginMessage = useSelector(getLoginMessage);
  const [formData, setFormData] = useState({ ...formDataInit });

  const handleInputChange = (e) => {
    dispatch(setLoginMessage(''));
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    dispatch(logUserIn(formData));
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
              value={formData.email}
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
              value={formData.password}
              required
              onChange={handleInputChange}
              autoComplete='current-password'
            />
          </label>
        </div>
        <div className='login-buttons'>
          <button type='submit'>Log me in</button>
          <button type='submit'>Register</button>
        </div>
      </form>
      <p className='login-message'>{loginMessage}</p>
    </div>
  );
}

export default Login;
