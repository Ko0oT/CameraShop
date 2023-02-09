import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../constants';
import Basket from '../../pages/basket/basket';
import Catalog from '../../pages/catalog/catalog';
import NotFound from '../../pages/not-found/not-found';
import Product from '../../pages/product/product';
import Layout from '../layout/layout';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoute.Root} element={<Layout/>}>
            <Route index element={<Catalog/>}/>
            <Route path={`${AppRoute.Root}/:pageId`} element={<Catalog/>}/>
            <Route path={`${AppRoute.Product}/:id`} element={<Product/>}/>
            <Route path={AppRoute.Basket} element={<Basket/>}/>
          </Route>
          <Route path='*' element={<NotFound />}/>
          <Route path={AppRoute.NotFound} element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
