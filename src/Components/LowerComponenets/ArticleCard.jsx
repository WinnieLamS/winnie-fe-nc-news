import { patchComment } from "../../Api";
import { CommentList } from "./CommentList";
import { Loading } from "./Loading";

export const ArticleCard = ({ article, setArticle, isLoading, setError}) => {
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

  const upVote = (article_id)=>{
    setArticle((currentArticleData)=>{
        if (currentArticleData.article_id === article_id){
          return { ...currentArticleData, votes: currentArticleData.votes + 1}
        }
        return currentArticleData;
    })
    patchComment(article_id)
    .catch((error) => {
      setError(error);
      setArticle((currentArticleData)=>{
          if (currentArticleData.article_id === article_id){
            return { ...currentArticleData, votes: currentArticleData.votes - 1}
          }
          return currentArticleData;
        })
    })
  }

    return (
      <>
      <section className="article_card">
        <h2>{article.title}</h2>
        <p>Topic: {article.topic}</p>
        <p>Author: {article.author}</p>
        <img src={article.article_img_url} alt={article.title} />
        <p>{article.body}</p>
        <p>Created at: {formatDate(article.created_at)}</p>
        <button onClick={()=> upVote(article.article_id)}><span aria-label="votes for this article">✅ </span>
        Votes for article: {article.votes}
        </button>
        <p>Comments: {article.comment_count}</p>
      </section>
      <section className="article_comment">
        <CommentList article={article} />
      </section>
      </>
    );
  };
  