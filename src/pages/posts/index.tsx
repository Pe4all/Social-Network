import { useGetAllPostsQuery } from "../../app/services/postApi"
import CreatePost from "../../components/create-post"
import Card from "../../components/card"

const Posts = () => {
  const { data } = useGetAllPostsQuery()

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
      {data && data.length > 0
        ? data.map(
          ({
            content,
            author,
            id,
            authorId,
            comments,
            likes,
            likedByUser,
            createdAt,
          }) => (
            <Card
              cardFor="post"
              key={id}
              avatarUrl={author.avatarUrl || ""}
              content={content}
              name={author.name || ""}
              likesCount={likes.length}
              commentsCount={comments.length}
              authorId={authorId}
              id={id}
              likedByUser={likedByUser}
              createdAt={createdAt}
            />
          ),
        )
        : null}
    </>
  )
}

export default Posts
