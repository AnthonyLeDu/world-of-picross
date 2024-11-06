import { useSelector } from 'react-redux';
import './index.scss';
import { getIsLoggedIn, getAuthMessage } from '../../store/selectors/user';
import Profile from './Profile';
import AuthForms from './AuthForms';


function Auth() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const authMessage = useSelector(getAuthMessage);


  return (
    <div className='auth'>
      {isLoggedIn ? <Profile /> : <AuthForms />}
      <p className='auth-message'>{authMessage}</p>
      </div>
  );
}

export default Auth;
