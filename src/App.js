import './App.css';
import { Layout } from './components/layout/Layout';
import { BooksProvider } from './contexts/BooksContext';
import { CartProvider } from './contexts/CartContext'


function App() {
  return (
    <BooksProvider>
      <CartProvider>
        <Layout />
      </CartProvider>
    </BooksProvider>
  );
}

export default App;
