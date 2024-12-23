import PostItem from "./post-item";
import classes from "./posts-grid.module.css";

export default function PostsGrid(props) {
  return (
    <ul className={classes.grid}>
      {props.posts.map((post) => (
        <PostItem post={post} key={post.slug} />
      ))}
    </ul>
  );
}
