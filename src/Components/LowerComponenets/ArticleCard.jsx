import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleById, patchVote } from "../../Api";
import { CommentSection } from "./CommentSection";
import { Loading } from "./Loading";
import { UserContext } from "../../contexts/UserContext";

export const ArticleCard = ({ article, setArticle, isLoading, setIsLoading, setError }) => {
    const { article_id } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getArticleById(article_id)
            .then((articleFromApi) => {
                setArticle(articleFromApi);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
                return navigate("/error")
            });
    }, [article_id, setArticle, setIsLoading, setError]);

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

    if (isLoading) {
        return <Loading />;
    }

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

    return (
        <>
            {article && (
                <section className="article_card">
                    <h2>{article.title}</h2>
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
