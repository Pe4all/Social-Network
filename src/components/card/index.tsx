import type React from 'react'

import { CardBody, CardFooter, CardHeader, Card as HeroCard, Spinner } from '@heroui/react'
import { useLikePostMutation, useUnlikePostMutation } from '../../app/services/likesApi';
import { useDeletePostMutation, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from '../../app/services/postApi';
import { useDeleteCommentMutation } from '../../app/services/commentsApi';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectCurrent } from '../../features/user/user-slice';
import User from '../user';
import { formatToClientDate } from '../../utils/format-to-client';
import { RiDeleteBinLine } from 'react-icons/ri';
import Typography from '../typography';
import MetaInfo from '../meta-info';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { FcDislike } from 'react-icons/fc';
import { FaRegComment } from 'react-icons/fa';
import ErrorMessage from '../error-message';
import { hasErrorField } from '../../utils/has-error-field';

type Props = {
  avatarUrl: string,
  name: string,
  authorId: string;
  content: string;
  commentId?: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: Date;
  id?: string;
  cardFor: 'comment' | 'post' | 'current-post';
  likedByUser?: boolean;
}

const Card: React.FC<Props> = ({ authorId = '', avatarUrl = '', cardFor = 'post', content = '', name = '', commentId = '', commentsCount = 0, createdAt, id = '', likedByUser = false, likesCount = 0 }) => {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrent);

  const refetchPosts = async () => {
    switch (cardFor) {
      case 'post':
        await triggerGetAllPosts().unwrap();
        break;
      case 'current-post':
        await triggerGetPostById(id).unwrap();
        break;
      case 'comment':
        await triggerGetPostById(id).unwrap();
        break;
      default:
        throw new Error('неверный аргумент cardFor')
    }
  }

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case 'post':
          await deletePost(id).unwrap();
          await refetchPosts();
          break;
        case 'current-post':
          await deletePost(id).unwrap();
          navigate('/');
          break;
        case 'comment':
          await deleteComment(commentId).unwrap();
          await refetchPosts();
          break;
        default:
          throw new Error('неверный аргумент cardFor')
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      } else {
        setError(error as string)
      }
    }
  }

  const handleClick = async () => {
    try {
      likedByUser
        ? await unlikePost(id).unwrap()
        : await likePost({ postId: id }).unwrap()

      await refetchPosts()
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error)
      } else {
        setError(err as string)
      }
    }
  }

  return (
    <HeroCard className='mb-5'>
      <CardHeader className='justify-between items-center bg-transperent'>
        <Link to={`/users/${authorId}`}>
          <User name={name} className='text-small font-semibold leading-non text-default-600' avatarUrl={avatarUrl} description={createdAt && formatToClientDate(createdAt)} />
        </Link>
        {
          authorId === currentUser?.id && (
            <div className="cursor-pointer" onClick={handleDelete}>
              {
                deletePostStatus.isLoading || deleteCommentStatus.isLoading ? <Spinner /> : <RiDeleteBinLine />
              }
            </div>
          )
        }
      </CardHeader>
      <CardBody className='px-3 py-2 mb-5'>
        <Typography>{content}</Typography>
      </CardBody>
      {
        cardFor !== 'comment' && (
          <CardFooter className='gap-3'>
            <div className="flex gap-5 items-center">
              <div onClick={handleClick}>
                <MetaInfo
                  count={likesCount}
                  Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder} />
              </div>
              <Link to={`/posts/${id}`}>
                <MetaInfo
                  count={commentsCount}
                  Icon={FaRegComment} />
              </Link>
            </div>
            <ErrorMessage error={error} />
          </CardFooter>
        )
      }
    </HeroCard>
  )
}

export default Card
