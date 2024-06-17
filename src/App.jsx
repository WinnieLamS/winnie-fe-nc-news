import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { Home } from './Components/Home';
import { ArticleCard } from './Components/LowerComponenets/ArticleCard';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/articles/:article' element={<ArticleCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
