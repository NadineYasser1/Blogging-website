import classes from './Title.module.css'

function Title({children}) {
return <div className={classes.container}>
<h1 className={classes.title}>{children}</h1>
</div>
}

export default Title