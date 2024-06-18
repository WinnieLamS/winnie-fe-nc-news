import { useState, useEffect } from "react";
import { getCommentById } from "../../Api";
import { Loading } from "./Loading";
import { Error } from "./Error";

export const CommentList = ({ article }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [author, setAuthor] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null);
    
    useEffect(() => { 
        setIsLoading(true)
        getCommentById(article.article_id)
        .then((commentArrFromApi) => {
            setComments(commentArrFromApi);
          setIsLoading(false)
        })
        .catch((error)=>{
            setError(error);
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
        <form onSubmit={handleCommentSubmit}>
            {/* <p>{username}</p> */}
            <input
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
            ></input>
            <button type="submit">Post</button>
        </form>
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
    )
}