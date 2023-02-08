import { BrowserRouter } from 'react-router-dom';
import Catalog from '../../pages/catalog/catalog';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Catalog/>
    </BrowserRouter>
  );
}

export default App;
