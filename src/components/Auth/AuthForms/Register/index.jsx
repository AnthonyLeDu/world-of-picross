import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss';
import { registerWithCredentials } from '../../../../store/api/user';
import { getIsLoggingIn } from '../../../../store/selectors/user';
import { setAuthMessage } from '../../../../store/actions/user';

const formContentInit = {
  pseudo: '',
  username: '',
  password: '',
};

function Register() {
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
    dispatch(registerWithCredentials(formData));
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <fieldset>
        <label>
          Pseudo
          <input
            type="text"
            name="pseudo"
            value={formContent.pseudo}
            placeholder="PicrossFanatic72"
            required
            onChange={handleInputChange}
            autoComplete="nickname"
          />
        </label>
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
            autoComplete="new-password"
          />
        </label>
      </fieldset>
      <button type="submit" disabled={isLoggingIn ? true : false}>
        Register
      </button>
    </form>
  );
}

export default Register;
