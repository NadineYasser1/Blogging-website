import { useRouter } from 'next/router';
import Card from '../ui/Card';
import classes from './BlogItem.module.css';
import { useTranslation } from 'react-i18next';

function BlogItem(props) {
  const router = useRouter();
  const { t } = useTranslation('common');

  function showDetailsHandler() {
    router.push('/' + props.id)
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <p>{props.blogText.substring(0,500)}...</p>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>{t('Continue Reading')}</button>
        </div>
      </Card>
    </li>
  );
}

export default BlogItem;