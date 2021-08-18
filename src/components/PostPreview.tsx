import { Link } from 'react-router-dom';
import Post from '../interfaces/Post';
import './PostPreview.css';

interface PostPreviewProps {
	post: Post
}

const PostPreview = ({ post }: PostPreviewProps) => {
	let excerpt = post.content;
	if (excerpt.length > 147) excerpt = excerpt.slice(0, 147) + '...';
	const date = (new Date(post.createdAt)).toLocaleDateString();

	return (
		<Link to={`/blog/${post.id}`} className="post-preview">
			<div className="content">
				<h2 className="title">{post.title}</h2>
				<div className="meta">
					<p>
						Posted by <span>{post.mainAuthor || post.createdBy} </span>
						{
							post.otherAuthors.length > 0 ? 'and others ' : ' '
						}
						on <span>{date}</span>
					</p>
				</div>
				<p className="excerpt">{excerpt}</p>
			</div>
			<div className="img-container">
				<img src={post.linkToHeaderImage} alt={post.title} />
			</div>
		</Link>
	);
}

export default PostPreview;