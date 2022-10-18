import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Fridge from '../pages/Fridge';
import Profile from '../pages/Profile';
import Recipes from '../pages/Recipes';
import ShoppingList from '../pages/ShoppingList';
import Header from './header/Header';
import Footer from './footer/Footer';
import Auth from '../pages/Auth';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Fridge />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/shoppinglist' element={<ShoppingList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
