import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { ErrorContext } from "../../contexts/ErrorContext";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleById, patchVote } from "../../Api";
import { CommentSection } from "./CommentSection";
import { Loading } from "./Loading";

export const ArticleCard = ({ article, setArticle }) => {
    const { article_id } = useParams();
    const { user } = useContext(UserContext);
    const { error, setError } = useContext(ErrorContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getArticleById(article_id)
            .then((articleFromApi) => {
                setArticle(articleFromApi);
                setIsLoading(false);
            })
            .catch((error) => {
                setError({ message: error.response.data.msg});
                setIsLoading(false);
                return navigate("/error")
            });
    }, [article_id]);

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    
    const handleVote = (voteChange) => {
        setArticle((currentArticleData) => {
            return { ...currentArticleData, votes: currentArticleData.votes + voteChange };
        });
        patchVote(article_id, voteChange)
        .catch((error) => {
            setError(error);
            setArticle((currentArticleData) => {
                return { ...currentArticleData, votes: currentArticleData.votes - voteChange };
            });
        });
    };
    
    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
      }

    return (
        <>
            {article && (
                <section className="article_card">
                    <h1>{article.title}</h1>
                    <p>Topic: {article.topic}</p>
                    <p>Author: {article.author}</p>
                    <img src={article.article_img_url} alt={article.title} />
                    <p>{article.body}</p>
                    <p>Created at: {formatDate(article.created_at)}</p>
                    <div>
                        {user.username?(
                            <>
                        <button onClick={() => handleVote(1)}>Upvote ✅</button>
                        <button onClick={() => handleVote(-1)}>Downvote ❌</button>
                            </>):(<p>Please log in for vote</p>)}
                        <p>Votes: {article.votes}</p>
                    </div>
                    <p>Comments: {article.comment_count}</p>
                </section>
            )}
            <section className="article_comment">
                <CommentSection article={article} setArticle={setArticle} setError={setError}/>
            </section>
        </>
    );
};
