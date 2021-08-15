import Post from '../interfaces/Post';
import PostPreview from "./PostPreview";
import './PostList.css';

const PostList = ({ posts }: { posts: Post[] }) => {
	return (
		<div className="post-list">
			{
				posts.filter(post => post.isPublished).map(post => {
					return <PostPreview key={post.id} post={post} />
				})
			}
		</div>
	)
}

export default PostList;