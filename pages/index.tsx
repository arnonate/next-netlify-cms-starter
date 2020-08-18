import matter from "gray-matter";
import { GetStaticProps } from "next";

import Layout from "@components/Layout";
import PostList from "@components/PostList";

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

export interface Post {
  frontmatter: { [key: string]: any };
  markdownBody: string;
  slug: string;
}

interface IndexProps {
  posts: Post[];
  title: string;
  description: string;
}

const Index = ({ posts, title, description }: Readonly<IndexProps>) => {
  if (typeof window !== "undefined" && window.netlifyIdentity) {
    window.netlifyIdentity.on("init", (user: unknown) => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }

  return (
    <Layout pageTitle={title}>
      <h1 className="title">Champions of Commerce</h1>
      <p className="description">{description}</p>
      <main>
        <PostList posts={posts} />
      </main>
    </Layout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const configData = await import(`../siteconfig.json`);
  console.log({ configData });

  const extractPosts = (context: __WebpackModuleApi.RequireContext) => {
    const keys: string[] = context.keys();
    const values: any = keys.map(context);

    console.log(JSON.stringify(values));

    const data = keys.map((key, index) => {
      const slug: string = key.replace(/^.*[\\\/]/, "").slice(0, -3);
      const value: any = values[index];
      const document: { data: object; content: string } = matter(
        value?.default
      );

      return {
        frontmatter: document?.data,
        markdownBody: document?.content,
        slug,
      };
    });

    return data;
  };

  const postContext = require.context("../posts", true, /\.md$/);

  const posts: Post[] = extractPosts(postContext);

  return {
    props: {
      posts,
      title: configData.title,
      description: configData.description,
    },
  };
};
