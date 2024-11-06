import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { useEffect } from 'react';
import { loginWithCookie } from '../../../store/api/user';
import { getCurrentAuthForm } from '../../../store/selectors/app';
import Login from './Login';
import Register from './Register';
import classNames from 'classnames';
import { setCurrentAuthForm } from '../../../store/actions/app';

function AuthForms() {
  const dispatch = useDispatch();
  const currentAuthForm = useSelector(getCurrentAuthForm);

  useEffect(() => {
    dispatch(loginWithCookie());
  }, [dispatch]);

  const handleTabClick = (newCurrentAuthForm) => () => {
    dispatch(setCurrentAuthForm(newCurrentAuthForm));
  };

  return (
    <div className="authforms">
      <div className="authforms-tabs">
        <button
          className={classNames('authforms-tabs__tab', {
            'authforms-tabs__tab--current': currentAuthForm === 'login',
          })}
          onClick={handleTabClick('login')}
        >
          Login
        </button>
        <button
          className={classNames('authforms-tabs__tab', {
            'authforms-tabs__tab--current': currentAuthForm !== 'login',
          })}
          onClick={handleTabClick('register')}
        >
          Register
        </button>
      </div>
      <div className="authforms-form">
        {currentAuthForm === 'login' ? <Login /> : <Register />}
      </div>
    </div>
  );
}

export default AuthForms;
