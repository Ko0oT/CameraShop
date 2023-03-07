import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppRoute, MAIN_CONTENT_POSITION } from '../../constants';

function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(() => {

    if (/[0-9]/.test(pathname.charAt(1))) {
      window.scrollTo({
        top: MAIN_CONTENT_POSITION,
        left: 0,
        behavior: 'smooth',
      });
      return;
    }

    if (pathname.includes(AppRoute.Characteristics) || pathname.includes(AppRoute.Description)) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      return;
    }

    window.scrollTo(0, 0);


  }, [pathname]);

  return null;
}

export default ScrollToTop;
