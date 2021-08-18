import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useBlog } from '../contexts/blogContext';
import Avatar from './Avatar';
import Loader from './Loader';
import './PostDetails.css';

const PostDetails = () => {
	const id = +(useParams<{ id: string }>().id);
	const history = useHistory();
	const { isLoading, fetchPost, currentPost } = useBlog();

	if (isNaN(id)) history.push('/not-found');

	useEffect(() => {
		fetchPost(id);
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<Loader isLoading={isLoading} />
			{
				currentPost && (
					<div className="post">
						<img src={currentPost.linkToHeaderImage} alt={currentPost.title} />
						<h1>{currentPost.title}</h1>
						<hr />
						<div className="post-creation">
							<div className="post-avatar-container">
								<Avatar />
							</div>
							<div className="post-creation-details">
								<span>
									{
										currentPost.otherAuthors.length > 0
											? <span>
												<span className="post-creator">{currentPost.mainAuthor} </span>
												with help from
												<span className="post-creator"> {currentPost.otherAuthors.join(', ')}</span>
											</span>
											: <span className="post-creator">
												{currentPost.createdBy}
											</span>
									}
								</span>
								<span>Posted on <span className="post-date">
									{(new Date(currentPost.createdAt)).toLocaleDateString()}
								</span>
								</span>

							</div>
						</div>
						<hr />
						<p className="post-content">{currentPost.content}</p>
					</div>
				)
			}
		</>
	)
}

export default PostDetails;