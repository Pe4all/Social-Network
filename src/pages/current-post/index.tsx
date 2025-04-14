import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../../app/services/postApi';
import Card from '../../components/card';
import GoBack from '../../components/go-back';
import CreateComment from '../../components/create-comment';

const CurrentPost = () => {
  const params = useParams<{ id: string }>();
  const { data } = useGetPostByIdQuery(params?.id ?? '');

  if (!data) {
    return <h2>Поста не существует</h2>
  }

  const { author, authorId, comments, content, createdAt, id, likes, likedByUser } = data;

  return (
    <>
      <GoBack />
      <Card cardFor='current-post' avatarUrl={author.avatarUrl ?? ''} content={content} authorId={authorId} likesCount={likes.length} commentsCount={comments.length} id={id} likedByUser={likedByUser} createdAt={createdAt} name={author.name ?? ''} />
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {
          data.comments &&
          data.comments.map((comment) => (
            <Card cardFor='comment' key={comment.id} avatarUrl={comment.user.avatarUrl ?? ''} content={comment.content} name={comment.user.name ?? ''} authorId={comment.userId} commentId={comment.id} id={id} />
          ))
        }
      </div>
    </>
  )
}

export default CurrentPost
