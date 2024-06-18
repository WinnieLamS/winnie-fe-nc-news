import './App.css';
import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { Home } from './Components/Home';
import { ArticleCard } from './Components/LowerComponenets/ArticleCard';
import { Footer } from './Components/Footer';
import { CommentList } from './Components/LowerComponenets/CommentList';
import { User } from './Components/User';
import { UserProvider } from './contexts/UserContext';
import { LogIn } from './Components/LowerComponenets/LogIn';


function App() {
  
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  



  return (
    <UserProvider>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home setArticle={setArticle} 
        isLoading={isLoading} setIsLoading={setIsLoading}
        setError={setError}/>} />
        <Route path='/articles/:title' element={<ArticleCard article={article} isLoading={isLoading} setIsLoading={setIsLoading}/>} />
        <Route path='/comments' element={<CommentList setError={setError}/>} />
        <Route path='/user' element={<User />} />
        <Route path='/login' element={<LogIn setError={setError}/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
