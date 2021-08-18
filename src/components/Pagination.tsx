import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Pagination.css';
import Loader from './Loader';
import PostList from './PostList';
import { useBlog } from '../contexts/blogContext';

const Pagination = () => {
	const history = useHistory();
	const urlSearchParams = new URLSearchParams(useLocation().search);
	const originalPageSize = +(urlSearchParams.get('pagesize') || -1);
	const originalPage = +(urlSearchParams.get('page') || -1);
	const [pageSize] = useState((!isNaN(originalPageSize) && originalPageSize > 0) ? originalPageSize : 1);
	const [page, setPage] = useState((!isNaN(originalPage) && originalPage > 0) ? originalPage : 1);
	const { posts, isLoading, fetchPosts } = useBlog();
	const [startIndex, setStartIndex] = useState(0);

	if (originalPageSize !== pageSize || originalPage !== page) {
		history.push(`/blog/page?pagesize=${pageSize}&page=${page}`);
	}

	const fetchPagePosts = async () => {
		const returnedPosts = await fetchPosts();
		const start = pageSize * (page - 1);
		if (start < 0 || start >= returnedPosts.length) history.push('/not-found');
		setStartIndex(start);
	}

	useEffect(() => {
		fetchPagePosts();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		history.push(`/blog/page?pagesize=${pageSize}&page=${page}`);
		fetchPagePosts();
	}, [page]);

	return (
		<div className="pagination">
			<h1>Page {page}</h1>
			<Loader isLoading={isLoading} />
			<PostList posts={posts.slice(startIndex, Math.min(startIndex + pageSize, posts.length))} />
			<div className="pagination-buttons">
				<div className="left-button">
					{
						startIndex > 0 && (
							<button onClick={() => setPage(page - 1)}>Page {page - 1}</button>
						)
					}
				</div>
				<div className="right-button">
					{
						startIndex + pageSize < posts.length - 1 && (
							<button onClick={() => setPage(page + 1)}>Page {page + 1}</button>
						)
					}
				</div>
			</div>
		</div>
	);
}

export default Pagination;