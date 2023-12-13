import classes from './BlogDetail.module.css'

function BlogDetail({image, title, blogText}) {
    
    return <section className={classes.detail}>
    <h1>{title}</h1>
    <img src={image} alt={title} />
    <p>{blogText}</p>
    </section>
}
export default BlogDetail;