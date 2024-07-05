import { useContext, useState } from "react";
import { deleteComment, getCommentById } from "../../Api";
import { Loading } from "./Loading";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { ErrorContext } from "../../contexts/ErrorContext";
import "../../css/CommentSection.css";

export const CommentCard = ({ comments, setComments, article_id, setArticle }) => {
    const { user } = useContext(UserContext);
    const { error, setError } = useContext(ErrorContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);


    const handleDeleteComment = (comment_id) => {
        setToggle(true);
        setIsLoading(true);
        deleteComment(comment_id)
            .then(() => {
                return getCommentById(article_id);
            })
            .then((commentArrFromApi) => {
                const sortedComments = commentArrFromApi.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setComments(sortedComments);
                setIsLoading(false);
                setArticle((currentArticle) => ({
                    ...currentArticle,
                    comment_count: currentArticle.comment_count - 1
                }));
                setToggle(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
                setToggle(false);
                navigate("/error");
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
    if (error) {
        return <Error error={error} />;
      }


    return (
        <section >
            {comments.map((comment) => (
                <section key={comment.comment_id} className="comment_card">
                    <div className="comment_author">{comment.author}</div>
                    <div className="comment_body">{comment.body}</div>
                    <div className="comment_meta">
                        <span className="comment_votes">Vote: {comment.votes}</span>
                        <span className="comment_time">Created at: {formatDate(comment.created_at)}</span>
                    </div>
                    {user.username === comment.author ? (
                        <button onClick={() => handleDeleteComment(comment.comment_id)} disabled={toggle}>Delete</button>
                    ) : null}
                </section>
            ))}
        </section>
    );
};
