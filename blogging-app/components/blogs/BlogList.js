import BlogItem from './BlogItem';
import classes from './BlogList.module.css';

function BlogList({blogs}) {
  return (
    <ul className={classes.list}>
      {blogs.map((blog) => (
        <BlogItem
          key={blog.id}
          id={blog.id}
          image={blog.image}
          title={blog.title}
          blogText={blog.blogText}
        />
      ))}
    </ul>
  );
}

export default BlogList;