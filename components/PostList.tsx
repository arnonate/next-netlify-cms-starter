import Link from "next/link";

type PostListProps = {
  posts?: any[];
};

const PostList = ({ posts = [] }: Readonly<PostListProps>) => {
  if (posts.length < 1) return null;

  return (
    <div>
      {!posts && <div>No posts!</div>}
      <ul>
        {posts &&
          posts.map((post) => {
            return (
              <li key={post.slug}>
                <Link href={{ pathname: `/post/${post.slug}` }}>
                  <a>{post.frontmatter.title}</a>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default PostList;
