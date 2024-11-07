import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { getUserProfile, logout } from '../../../store/api/user';
import { getAuthMessage, getUserName, getUserPseudo } from '../../../store/selectors/user';
import { useEffect } from 'react';


function Profile() {
  const dispatch = useDispatch();
  const userPseudo = useSelector(getUserPseudo);
  const userName = useSelector(getUserName);
  const authMessage = useSelector(getAuthMessage);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const handleLogout = (e) => {
    dispatch(logout());
  };

  return (
    <div className='profile'>
      <h2 className='profile__pseudo'>{userPseudo}</h2>
      <p className='profile__mail'>{userName}</p>
      <button className='profile__logout' onClick={handleLogout}>X</button>
      <p className='auth-message'>{authMessage}</p>
      </div>
  );
}

export default Profile;
