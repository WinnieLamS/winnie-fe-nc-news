import './App.css';
import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { Home } from './Components/Home';
import { ArticleCard } from './Components/LowerComponenets/ArticleCard';
import { Footer } from './Components/Footer';

function App() {
  
  const [article, setArticle] = useState({});

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home setArticle={setArticle} />} />
        <Route path='/articles/:title' element={<ArticleCard article={article} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
