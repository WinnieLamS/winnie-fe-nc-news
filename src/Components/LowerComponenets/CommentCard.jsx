import { useState } from "react";
import { deleteComment, getCommentById } from "../../Api";
import { Loading } from "./Loading";
import { useNavigate } from "react-router-dom";

export const CommentCard = ({ comments, setComments, user, article_id, setError, setArticle }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const handleDeleteComment = (comment_id) => {
        setIsLoading(true);
        deleteComment(comment_id)
            .then(() => {
                return getCommentById(article_id);
            })
            .then((commentArrFromApi) => {
                setComments(commentArrFromApi);
                setIsLoading(false);
                setArticle((currentArticle) => ({
                    ...currentArticle,
                    comment_count: currentArticle.comment_count - 1
                }));
            })
            .catch((error) => {
                setError(error);
                navigate("/error");
                setIsLoading(false);
            });
    };

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

    return (
        <section className="comment_card">
            {comments.map((comment) => (
                <section key={comment.comment_id} className="comment_section">
                    <div className="comment_author">{comment.author}</div>
                    <div className="comment_body">{comment.body}</div>
                    <div className="comment_meta">
                        <span className="comment_votes">Vote: {comment.votes}</span>
                        <span className="comment_time">Created at: {formatDate(comment.created_at)}</span>
                    </div>
                    {user.username === comment.author ? (
                        <button onClick={() => handleDeleteComment(comment.comment_id)}>Delete</button>
                    ) : null}
                </section>
            ))}
        </section>
    );
};
