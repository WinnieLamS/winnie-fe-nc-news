import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { ErrorContext } from "../../contexts/ErrorContext";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleById, patchVote } from "../../Api";
import { CommentSection } from "./CommentSection";
import { Loading } from "./Loading";
import "../../css/ArticleCard.css";  // Importing the CSS file

export const ArticleCard = ({ article, setArticle }) => {
    const { article_id } = useParams();
    const { user } = useContext(UserContext);
    const { error, setError } = useContext(ErrorContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [hasUpvoted, setHasUpvoted] = useState(false);
    const [hasDownvoted, setHasDownvoted] = useState(false);

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
        if ((voteChange === 1 && hasUpvoted) || (voteChange === -1 && hasDownvoted)) {
            return;
        }

        setArticle((currentArticleData) => {
            if (voteChange === 1) {
                setHasUpvoted(true);
            } else if (voteChange === -1) {
                setHasDownvoted(true);
            }
                return { ...currentArticleData, votes: currentArticleData.votes + voteChange };
            });
       
        patchVote(article.article_id, voteChange)
        .catch((error) => {
            if (voteChange === 1) {
                setHasUpvoted(false);
            } else if (voteChange === -1) {
                setHasDownvoted(false);
            }
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
                    <p id="topic">{article.topic}</p>
                    <img src={article.article_img_url} alt={article.title} />
                    <p id="author">By {article.author}</p>
                    <p>{formatDate(article.created_at)}</p>
                    <p>{article.body}</p>
                    <div className="vote_buttons">
                        {user.username ? (
                            <>
                                <button onClick={() => handleVote(1)}>Upvote ✅</button>
                                <button onClick={() => handleVote(-1)}>Downvote ❌</button>
                            </>
                        ) : (
                            <p>Please log in to vote</p>
                        )}
                        <p className="votes">Votes: {article.votes}</p>
                    </div>
                    <p className="comment_count">Comments: {article.comment_count}</p>
                </section>
            )}
            <section className="article_comment">
                <CommentSection article={article} setArticle={setArticle} setError={setError}/>
            </section>
        </>
    );
};
