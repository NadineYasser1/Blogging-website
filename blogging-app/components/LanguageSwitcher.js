import { useRouter } from 'next/router';
import classes from './LanguageSwitcher.module.css'
// import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
const router = useRouter()

const handleLocaleChange = (event) => {
    const value = event.target.value;
    router.push(router.route, router.asPath, {
        locale: value,
    })
}
return (
    <select onChange={handleLocaleChange} value={router.locale} className={classes.opts}>
    <option value="en">ENG</option>
    <option value="ar">AR</option>
  </select>
)
}

export default LanguageSwitcher;
