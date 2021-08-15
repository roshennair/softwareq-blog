import { useState, useEffect } from 'react';
import blog from '../services/blog';
import Post from '../interfaces/Post';
import Loader from './Loader';
import PostList from './PostList';
import './Home.css';

const Home = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			setIsLoading(true)
			const returnedPosts = await blog.getAllPosts();
			setPosts(returnedPosts);
			setIsLoading(false);
		}

		fetchPosts();
	}, []);

	return (
		<div className="home">
			<h1>All Posts</h1>
			<Loader isLoading={isLoading} />
			<PostList posts={posts} />
		</div>
	)
}

export default Home;
