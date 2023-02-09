import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';

function NotFound() {
  const style = {
    marginLeft: '40px'
  };

  return (
    <>
      <Helmet>
        <title>Страница не найдена - Фотошоп</title>
      </Helmet>
      <h1 style={style}>404 Not Found</h1>
      <Link className='breadcrumbs__link' style={style} to={AppRoute.Root}>Вернуться на главную</Link>
    </>
  );
}

export default NotFound;
