import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slice/userSlice';


const UserComponent = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.user?.accessToken);
  const userData = useSelector(state => state.user.data);
  const isLoading = useSelector(state => state.user.isLoading);
  const isError = useSelector(state => state.user.isError);

  useEffect(() => {

    if (accessToken) {
      dispatch(fetchUsers(accessToken));
    }
  }, [dispatch, accessToken]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error occurred while fetching user data.</p>}
      {userData && (
        <div>
          <h2>User Data</h2>
          <ul>
            {userData.map(user => (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserComponent;
