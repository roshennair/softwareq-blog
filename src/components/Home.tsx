import { useEffect } from 'react';
import Loader from './Loader';
import PostList from './PostList';
import './Home.css';
import { useBlog } from '../contexts/blogContext';

const Home = () => {
	const { posts, fetchPosts, isLoading } = useBlog();

	useEffect(() => {
		fetchPosts();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="home">
			<h1>All Posts</h1>
			<Loader isLoading={isLoading} />
			<PostList posts={posts} />
		</div>
	);
}

export default Home;
