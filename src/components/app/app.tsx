import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Basket from '../../pages/basket/basket';
import Catalog from '../../pages/catalog/catalog';
import NotFound from '../../pages/not-found/not-found';
import Product from '../../pages/product/product';
import Layout from '../layout/layout';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Catalog/>}/>
          <Route path=':pageId' element={<Catalog/>}/>
          <Route path='product/:id' element={<Product/>}/>
          <Route path='basket' element={<Basket/>}/>
        </Route>
        <Route path='*' element={<NotFound />}/>
        <Route path='/404' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
