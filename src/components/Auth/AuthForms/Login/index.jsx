import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss';
import { loginWithCredentials } from '../../../../store/api/user';
import { getIsLoggingIn } from '../../../../store/selectors/user';
import { setAuthMessage } from '../../../../store/actions/user';

const formContentInit = {
  username: '',
  password: '',
};

function Login() {
  const dispatch = useDispatch();
  const isLoggingIn = useSelector(getIsLoggingIn);
  const [formContent, setFormContent] = useState({ ...formContentInit });

  const handleInputChange = (e) => {
    dispatch(setAuthMessage(''));
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

  return (
    <form className="login" onSubmit={handleSubmit} autoComplete="on">
      <fieldset>
        <label>
          Email
          <input
            type="email"
            name="username" // OAuth2 expects a 'username' key
            value={formContent.username}
            placeholder="john.doe@email.com"
            required
            onChange={handleInputChange}
            autoComplete="email"
            autoFocus
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={formContent.password}
            required
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </label>
      </fieldset>
      <button type="submit" disabled={isLoggingIn ? true : false}>
        Log in
      </button>
    </form>
  );
}

export default Login;
