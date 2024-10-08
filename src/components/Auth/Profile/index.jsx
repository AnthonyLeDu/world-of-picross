import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { getUserProfile } from '../../../store/api/user';
import { getUserEmail, getUserPseudo } from '../../../store/selectors/user';
import { useEffect } from 'react';


function Profile() {
  const dispatch = useDispatch();
  const userPseudo = useSelector(getUserPseudo);
  const userMail = useSelector(getUserEmail);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <div className='profile'>
      <h2 className='profile__pseudo'>{userPseudo}</h2>
      <p className='profile__mail'>{userMail}</p>
    </div>
  );
}

export default Profile;
