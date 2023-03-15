import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks';
import Basket from '../../pages/basket/basket';
import Catalog from '../../pages/catalog/catalog';
import NotFound from '../../pages/not-found/not-found';
import Product from '../../pages/product/product';
import { getIsCamerasDataLoading, getIsPromoDataLoading } from '../../store/app-data/app-data-selectors';
import Layout from '../layout/layout';
import LoadingScreen from '../loading-screen/loading-screen';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

function App(): JSX.Element {
  const isCamerasDataLoading = useAppSelector(getIsCamerasDataLoading);
  const isPromoDataLoading = useAppSelector(getIsPromoDataLoading);

  if (isCamerasDataLoading || isPromoDataLoading) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Root} element={<Layout/>}>
          <Route index element={<Catalog/>}/>
          <Route path={`${AppRoute.Root}/:pageId/:sortType/:sortDirection`} element={<Catalog/>}/>
          <Route path={`${AppRoute.Product}/:id`} element={<Product/>}>
            <Route path={AppRoute.Description} element={<Product/>}/>
            <Route path={AppRoute.Characteristics} element={<Product/>}/>
          </ Route>
          <Route path={AppRoute.Basket} element={<Basket/>}/>
        </Route>
        <Route path='*' element={<NotFound />}/>
        <Route path={AppRoute.NotFound} element={<NotFound />}/>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
