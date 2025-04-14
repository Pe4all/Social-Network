import { User as HeroUser } from '@heroui/react';
import type React from 'react'
import { BASE_URL } from '../../constants';

type Props = {
  name: string;
  avatarUrl: string;
  description?: string;
  className?: string;
}

const User: React.FC<Props> = ({ avatarUrl = '', name = '', className = '', description = '' }) => {
  return (
    <HeroUser name={name} className={className} description={description} avatarProps={{ src: `${BASE_URL}${avatarUrl}` }} />
  )
}



export default User
