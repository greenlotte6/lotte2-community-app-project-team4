import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const Post = ({ post }) => {
  const { toggled } = useTheme();
  return (
    <>
      <Link
        to=""
        className={toggled ? "post-item dark" : "post-item"}
        data-post-id={post.id}
      >
        <img src="/images/chatting.jpg" alt="" className="post-thumbnail" />
        <span className="title-area">
          <h3 className="post-title">{post.title}</h3>
          <h4 className="post-author">{post.author}</h4>
        </span>
        <span>{post.date}</span>
      </Link>
    </>
  );
};

export default Post;
