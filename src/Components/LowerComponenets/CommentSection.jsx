import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { getCommentById, postComment } from "../../Api";
import { Loading } from "./Loading";
import { CommentCard } from "./CommentCard";

export const CommentSection = ({ article, setError, setArticle }) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        if (article.article_id) {
            getCommentById(article.article_id)
                .then((commentArrFromApi) => {
                    const sortedComments = commentArrFromApi.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setComments(sortedComments);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setIsLoading(false);
                    navigate("/error");
                });
        }
    }, [article]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        setToggle(true);
        postComment(article.article_id, user.username, newComment)
            .then((newCommentFromApi) => {
                setNewComment("");
                setComments((currentComments) => [newCommentFromApi, ...currentComments]);
                setArticle((currentArticle) => ({
                    ...currentArticle,
                    comment_count: currentArticle.comment_count + 1 
                }));
                setIsLoading(false);
                setToggle(false);
            })
            .catch((error) => {
                setError(error);
                navigate("/error");
                setToggle(false);
            });
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            {user.username ? (
                <form className="comment_form" onSubmit={handleCommentSubmit}>
                    <button type="button" onClick={() => navigate("/user")} className="username_button">
                        {user.username}
                    </button>
                    <textarea
                        className="comment_input"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={toggle}>Submit</button>
                </form>
            ) : (
                <form className="comment_form" onSubmit={(e) => e.preventDefault()}>
                    <section className="login_for_comment">
                        <button type="button" onClick={() => navigate("/log_in", { state: { from: location } })}>
                            Log In
                        </button>
                        <button type="button" onClick={() => navigate("/sign_up", { state: { from: location } })}>
                            Sign Up
                        </button>
                    </section>
                    <textarea
                        className="comment_input"
                        placeholder="If you want to write a comment, please log in first."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                    />
                </form>
            )}
            <CommentCard comments={comments} setComments={setComments} user={user} article_id={article.article_id} setError={setError} setArticle={setArticle}/>
        </>
    );
};
