import React from 'react'
import { useAppSelector } from '../../app/hooks';
import { selectCurrent } from '../../features/user/user-slice';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '@heroui/react';
import User from '../../components/user';

const Following = () => {
  const currentUser = useAppSelector(selectCurrent);

  if (!currentUser) {
    return null
  }

  return currentUser.following.length > 0 ? (
    <div className='gap-5 flex flex-col'>
      {
        currentUser.following.map(user => (
          <Link to={`/users/${user.following.id}`} key={user.following.id}>
            <Card>
              <CardBody className='block'>
                <User
                  name={user.following.name ?? ''}
                  avatarUrl={user.following.avatarUrl ?? ''}
                  description={user.following.email ?? ''}
                />
              </CardBody>
            </Card>
          </Link>
        ))}
    </div>
  ) : (<h2>Вы ни на кого не подписаны</h2>)
}

export default Following
