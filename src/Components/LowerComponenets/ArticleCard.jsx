export const ArticleCard = ({article}) => {
 
    return (
        <section className="article_card">
        <h3>{article.title}</h3>
        <p>{article.topic}</p>
        <p>{article.author}</p>
        <p>{article.body}</p>
        <p>{article.created_at}</p>
        <p>{article.votes}</p>
        <p>{article.comment_count}</p>
        </section>
    )
}