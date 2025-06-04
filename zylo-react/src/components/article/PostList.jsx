import Post from "./Post";

function PostList({ posts }) {
  return (
    <div className="list">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
export default PostList;
