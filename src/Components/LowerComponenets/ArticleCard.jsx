export const ArticleCard = ({ article }) => {
    return (
      <>
      <section className="article_card">
        <h3>{article.title}</h3>
        <p>Topic: {article.topic}</p>
        <p>Author: {article.author}</p>
        <img src={article.article_img_url} alt={article.title} />
        <p>{article.body}</p>
        <p>Created at: {article.created_at}</p>
        <p>Votes: {article.votes}</p>
        <p>Comments: {article.comment_count}</p>
      </section>
      <section className="article_comment">
        <p>comment zone</p>
      </section>
      </>
    );
  };
  