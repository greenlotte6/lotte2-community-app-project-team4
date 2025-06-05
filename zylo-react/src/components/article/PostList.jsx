import Post from "./Post";

function PostList() {
  const posts = [
    {
      id: 1,
      title: "4조 프로젝트 진행 상황",
      author: "김철수",
      group: "4조",
      date: "2024-12-15",
      content: "진행중",
      comments: [
        {
          id: 1,
          author: "김철수",
          date: "2025-06-02 14:30",
          content: "프로젝트 진행 상황이 궁금하네요!",
        },
      ],
      views: 24,
    },
    {
      id: 2,
      title: "4조 프로젝트 진행 상황",
      author: "김철수",
      group: "4조",
      date: "2024-12-15",
      content: "진행중",
      comments: [
        {
          id: 1,
          author: "김철수",
          date: "2025-06-02 14:30",
          content: "프로젝트 진행 상황이 궁금하네요!",
        },
      ],
      views: 24,
    },
    {
      id: 3,
      title: "4조 프로젝트 진행 상황",
      author: "김철수",
      group: "4조",
      date: "2024-12-15",
      content: "진행중",
      comments: [
        {
          id: 1,
          author: "김철수",
          date: "2025-06-02 14:30",
          content: "프로젝트 진행 상황이 궁금하네요!",
        },
      ],
      views: 24,
    },
    {
      id: 4,
      title: "4조 프로젝트 진행 상황",
      author: "김철수",
      group: "4조",
      date: "2024-12-15",
      content: "진행중",
      comments: [
        {
          id: 1,
          author: "김철수",
          date: "2025-06-02 14:30",
          content: "프로젝트 진행 상황이 궁금하네요!",
        },
      ],
      views: 24,
    },
  ];
  return (
    <section id="post-list-area">
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
export default PostList;
