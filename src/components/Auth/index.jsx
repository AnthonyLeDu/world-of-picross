import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { useEffect } from 'react';
import { loginWithCookie } from '../../store/api/user';
import { getIsLoggedIn, getLoginMessage } from '../../store/selectors/user';
import Login from './Login';
import Profile from './Profile';


function Auth() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const loginMessage = useSelector(getLoginMessage);

  useEffect(() => {
    dispatch(loginWithCookie());
  }, [dispatch]);


  return (
    <div className='auth'>
      {isLoggedIn === false && <Login />}
      {isLoggedIn === true && <Profile />}
      <p className='login-message'>{loginMessage}</p>
      </div>
  );
}

export default Auth;
