import React, {useContext} from 'react'
import { SelectedChatUserContext } from '../AppPlugin';

function UserCard({user}) {
  console.log(user)
  const { setGSelectedChatUser } = useContext(SelectedChatUserContext);

  return (
    <div className="d-flex flex-column more-rounded bg-white p-3">
      <h3>{user.username}</h3>
      <div>Email: {user.email}</div>
      <div>
        <button onClick={() => setGSelectedChatUser(user)}>Chat</button>
      </div>
    </div>
  )
}

export default UserCard
