import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { getCommentById, postComment } from "../../Api";
import { Loading } from "./Loading";

export const CommentList = ({ article, setError }) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        if (article && article.article_id) {
            getCommentById(article.article_id)
                .then((commentArrFromApi) => {
                    setComments(commentArrFromApi);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching comments:", error);
                    setError(error);
                    setIsLoading(false);
                    navigate("/error");
                });
        }
    }, [article, setError, navigate]);

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

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        postComment(article.article_id, user.username, newComment)
            .then((newCommentFromApi) => {
                setNewComment("");
                setComments((currentComments) => [newCommentFromApi, ...currentComments]);
            })
            .catch((error) => {
                console.error("Error posting comment:", error);
                setError(error);
                navigate("/error");
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
                    <button type="submit">Submit</button>
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
            {comments.map((comment) => (
                <section key={comment.comment_id} className="comment_section">
                    <div className="comment_author">{comment.author}</div>
                    <div className="comment_body">{comment.body}</div>
                    <div className="comment_meta">
                        <span className="comment_votes">Vote: {comment.votes}</span>
                        <span className="comment_time">Created at: {formatDate(comment.created_at)}</span>
                    </div>
                </section>
            ))}
        </>
    );
};
