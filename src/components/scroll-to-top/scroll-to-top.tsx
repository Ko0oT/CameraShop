import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { scrollToContent, scrollToTop } from '../../utils/utils';

function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(() => {

    if (/[0-9]/.test(pathname.charAt(1))) {
      scrollToContent();
      return;
    }

    if (pathname.includes(AppRoute.Characteristics) || pathname.includes(AppRoute.Description)) {
      scrollToTop();
      return;
    }

    window.scrollTo(0, 0);


  }, [pathname]);

  return null;
}

export default ScrollToTop;
