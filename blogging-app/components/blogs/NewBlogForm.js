import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';
import classes from './NewBlogForm.module.css';

function NewBlogForm(props) {
  const { t } =  useTranslation('common');
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const blogTextInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredBlogText = blogTextInputRef.current.value;


    const blogData = {
      title: enteredTitle,
      image: enteredImage,
      blogText: enteredBlogText,
    };

    props.onAddBlog(blogData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>{t('Blog Title')}</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>{t('Image URL')}</label>
          <input type='url' required id='image' ref={imageInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor='text'>{t('Start Writing!')}</label>
          <textarea
            id='blogText'
            required
            rows='50'
            ref={blogTextInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>{t('Add Blog')}</button>
        </div>
      </form>
    </Card>
  );
}

export default NewBlogForm;