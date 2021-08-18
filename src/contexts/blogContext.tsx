import { createContext, ReactNode, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Post from "../interfaces/Post";
import blog from '../services/blog';

interface BlogContextValue {
	posts: Post[];
	currentPost: Post | null;
	isLoading: boolean;
	fetchPosts: () => Promise<Post[]>;
	fetchPost: (id: number) => Promise<Post | null>;
}

const BlogContext = createContext<BlogContextValue | undefined>(undefined);

export const useBlog = () => {
	const context = useContext(BlogContext);
	if (!context) {
		throw new Error('useBlog must be used within BlogProvider.');
	}

	return context;
}

export const BlogProvider = ({ children }: { children: ReactNode }) => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [currentPost, setCurrentPost] = useState<Post | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();

	const fetchPosts = async () => {
		if (posts.length === 0) {
			setIsLoading(true);
			const returnedPosts = await blog.getAllPosts();
			setPosts(returnedPosts);
			setCurrentPost(null);
			setIsLoading(false);
			return returnedPosts;
		}
		return posts;
	}

	const fetchPost = async (id: number) => {
		const existingPost = posts.find(post => post.id === id);
		if (existingPost) {
			setCurrentPost(existingPost);
			return existingPost;
		} else {
			setIsLoading(true);
			const returnedPost = await blog.getOnePost(id);
			setIsLoading(false);
			if (returnedPost) {
				setCurrentPost(returnedPost);
			} else {
				history.push('/not-found');
			}
			return returnedPost;
		}
	}

	const providerValue: BlogContextValue = {
		posts,
		currentPost,
		isLoading,
		fetchPosts,
		fetchPost
	};

	return (
		<BlogContext.Provider value={providerValue}>
			{children}
		</BlogContext.Provider>
	);
}