import './App.css';
import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { Home } from './Components/Home';
import { ArticleCard } from './Components/LowerComponenets/ArticleCard';
import { Footer } from './Components/Footer';
import { User } from './Components/User';
import { UserProvider } from './contexts/UserContext';
import { LogIn } from './Components/LowerComponenets/LogIn';
import { SignUp } from './Components/LowerComponenets/SignUp';
import { Error } from './Components/LowerComponenets/Error';
import { CommentSection } from './Components/LowerComponenets/CommentSection';
import { ArticleList } from './Components/LowerComponenets/ArticleLIst';


function App() {
  
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  



  return (
    <UserProvider>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/articles/:topic' element={<ArticleList />} />
        <Route path='/' element={<Home setArticle={setArticle} 
        isLoading={isLoading} setIsLoading={setIsLoading}
        setError={setError}/>} />
        <Route path='/article/:article_id' element={<ArticleCard 
        article={article} setArticle={setArticle} 
        isLoading={isLoading} setIsLoading={setIsLoading}
        setError={setError}/>} />
        <Route path='/comments' element={<CommentSection setError={setError}/>} />
        <Route path='/user' element={<User />} />
        <Route path='/log_in' element={<LogIn setError={setError}/>} />
        <Route path='/sign_up' element={<SignUp setError={setError}/>} />
        <Route path='/error' element={<Error error={error}/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
