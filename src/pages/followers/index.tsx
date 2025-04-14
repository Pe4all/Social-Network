import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks'
import { selectCurrent } from '../../features/user/user-slice'
import { Card, CardBody } from '@heroui/react';
import User from '../../components/user';

const Followers: React.FC = () => {
  const currentUser = useAppSelector(selectCurrent);

  if (!currentUser) {
    return null
  }

  return currentUser.followers.length > 0 ? (
    <div className='gap-5 flex flex-col'>
      {
        currentUser.followers.map(user => (
          <Link to={`/users/${user.follower.id}`} key={user.follower.id}>
            <Card>
              <CardBody className='block'>
                <User
                  name={user.follower.name ?? ''}
                  avatarUrl={user.follower.avatarUrl ?? ''}
                  description={user.follower.email ?? ''}
                />
              </CardBody>
            </Card>
          </Link>
        ))}
    </div>
  ) : (<h2>У вас нет подписчиков</h2>)
}

export default Followers
