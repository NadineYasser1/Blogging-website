import classes from './FlatButton.module.css'

function FlatButton({children, onPress}) {

    return <div className={classes.buttonContainer}>
    <button className={classes.button} onClick={onPress}>{children}</button>
    </div>
    
}

export default FlatButton;