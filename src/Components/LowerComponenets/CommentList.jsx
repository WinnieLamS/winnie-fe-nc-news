import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getCommentById } from "../../Api";
import { Loading } from "./Loading";
import { Error } from "./Error";

export const CommentList = ({ article, error, setError}) => {
    const {user, setUser} = useContext(UserContext)
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    
    useEffect(() => { 
        setIsLoading(true)
        getCommentById(article.article_id)
        .then((commentArrFromApi) => {
            setComments(commentArrFromApi);
          setIsLoading(false)
        })
        .catch((error)=>{
            setError(error)
            setIsLoading(false)
        });
    }, [article.article_id]);

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
      
    };

    if (isLoading) {
        return <Loading />;
      }

      if (error) {
        return <Error error={error} />;
      }

      return (
        <>
        {user.username? (
        <form className="comment_form" onSubmit={handleCommentSubmit}>
            <p className="current_username">{user.username}</p>
            <input
                className="comment_input"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
            />
            <button type="submit">Post</button>
        </form>) : null}
        {comments.map((comment) => (
            <section key={comment.comment_id} className="comment_section">
                <div className="comment_author">{comment.author}</div>
                <div className="comment_body">{comment.body}</div>
                <div className="comment_meta">
                    <span className="comment_votes">Vote: {comment.votes}</span>
                    <span className="comment_time">Create Time: {formatDate(comment.created_at)}</span>
                </div>
            </section>
        ))}
        </>
    );
}