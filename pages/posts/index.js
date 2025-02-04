import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";

export default function AllPostsPage(props) {
    return (
      <>
        <Head>
          <meta
            name='description'
            content='A list of all programming-related tutorials and posts!'
          />
        </Head>
        <AllPosts posts={props.posts}/>
      </>
    )
  }

  
export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts
    }
  };
}