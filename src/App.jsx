import './App.css';
import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { Home } from './Components/Home';
import { ArticleCard } from './Components/LowerComponenets/ArticleCard';
import { Footer } from './Components/Footer';
import { CommentList } from './Components/LowerComponenets/CommentList';

function App() {
  
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home setArticle={setArticle} isLoading={isLoading} setIsLoading={setIsLoading}/>} />
        <Route path='/articles/:title' element={<ArticleCard article={article} isLoading={isLoading} setIsLoading={setIsLoading}/>} />
        <Route path='/comments' element={<CommentList />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
