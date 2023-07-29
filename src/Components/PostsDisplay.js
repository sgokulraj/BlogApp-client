import "../Stylesheet/PostsDisplay.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function PostsDisplay({
  _id,
  title,
  summary,
  cover,
  description,
  createdAt,
  author,
}) {
  return (
    <section>
      <Link to={`/post/${_id}`} className="displayPost">
        <div className="post">
          <div className="imageContainer">
            <img src={`https://lovely-spacesuit-fox.cyclic.app/${cover}`} alt="img" />
          </div>
          <div className="info">
            <h2>{title}</h2>
            <p className="authorAll">
              <span>{author.username}</span>
              <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
            </p>
            <p className="summary">{summary}</p>
          </div>
        </div>
      </Link>
    </section>
  );
}

export default PostsDisplay;
