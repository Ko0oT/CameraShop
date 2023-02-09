import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(() => {

    if (/[0-9]/.test(pathname.charAt(1))) {
      window.scrollTo({
        top: 500,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(0, 0);
    }

  }, [pathname]);

  return null;
}

export default ScrollToTop;
