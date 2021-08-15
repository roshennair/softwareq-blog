import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Post from '../interfaces/Post';
import blog from '../services/blog';
import Avatar from './Avatar';
import Loader from './Loader';
import './PostDetails.css';

const PostDetails = () => {
	const [post, setPost] = useState<Post | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams<{ id: string }>();
	const history = useHistory();

	useEffect(() => {
		const fetchPost = async (id: number) => {
			setIsLoading(true)
			const returnedPost = await blog.getOnePost(id);
			if (returnedPost && returnedPost.isPublished) {
				setPost(returnedPost);
				setIsLoading(false);
			} else {
				history.push('/not-found');
			}
		}

		fetchPost(+id);
	}, []);


	return (
		<>
			<Loader isLoading={isLoading} />
			{
				post && (
					<div className="post">
						<img src={post.linkToHeaderImage} alt={post.title} />
						<h1>{post.title}</h1>
						<hr />
						<div className="post-creation">
							<div className="post-avatar-container">
								<Avatar />
							</div>
							<div className="post-creation-details">
								<span>
									{
										post.otherAuthors.length > 0
											? <span>
												<span className="post-creator">{post.mainAuthor} </span>
												with help from
												<span className="post-creator"> {post.otherAuthors.join(', ')}</span>
											</span>
											: <span className="post-creator">
												{post.createdBy}
											</span>
									}
								</span>
								<span>Posted on <span className="post-date">
									{(new Date(post.createdAt)).toLocaleDateString()}
								</span>
								</span>

							</div>
						</div>
						<hr />
						<p className="post-content">{post.content}</p>
					</div>
				)
			}
		</>
	)
}

export default PostDetails;