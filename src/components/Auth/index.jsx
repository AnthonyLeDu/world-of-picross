import { useSelector } from 'react-redux';
import './index.scss';
import { getIsLoggedIn } from '../../store/selectors/user';
import Profile from './Profile';
import AuthForms from './AuthForms';


function Auth() {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <div className='auth'>
      {isLoggedIn ? <Profile /> : <AuthForms />}
      </div>
  );
}

export default Auth;
