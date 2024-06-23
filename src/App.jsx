import './App.css';
import { useState } from "react";
import { UserProvider } from './contexts/UserContext';
import { ErrorProvider } from './contexts/ErrorContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { Home } from './Components/Home';
import { ArticleCard } from './Components/LowerComponenets/ArticleCard';
import { Footer } from './Components/Footer';
import { User } from './Components/User';
import { LogIn } from './Components/LowerComponenets/LogIn';
import { SignUp } from './Components/LowerComponenets/SignUp';
import { Error } from './Components/LowerComponenets/Error';
import { CommentSection } from './Components/LowerComponenets/CommentSection';


function App() {
  
  const [article, setArticle] = useState({});

  return (
    <UserProvider>
      <ErrorProvider>
         <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home setArticle={setArticle} />} />
        
        <Route path='/article/:article_id' element={<ArticleCard 
        article={article} setArticle={setArticle} />} />

        <Route path='/comments' element={<CommentSection />} />
        <Route path='/user' element={<User />} />
        <Route path='/log_in' element={<LogIn />} />
        <Route path='/sign_up' element={<SignUp />} />
        <Route path='/error' element={<Error />} />
        <Route path='*' element={<Error error={{ message: "Page Not Found" }} />} />
      </Routes>
      <Footer />
        </BrowserRouter>
      </ErrorProvider>
    </UserProvider>
  );
}

export default App;
