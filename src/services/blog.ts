import Post from "../interfaces/Post";

const {
	REACT_APP_SUB_KEY = '8264bdc50b8349639de07372b9edf53b',
} = process.env;

const getAllPosts = async () => {
	const reqUrl = `/ListAll?softwareq-apim-subscription-key=${REACT_APP_SUB_KEY}`;
	try {
		const res = await fetch(reqUrl);
		const posts: Post[] = await res.json();
		return posts;
	} catch (e) {
		console.log('Error fetching all posts.', e);
		return [];
	}
}

const getOnePost = async (id: number) => {
	const reqUrl = `/ById?id=${id}&softwareq-apim-subscription-key=${REACT_APP_SUB_KEY}`;
	try {
		const res = await fetch(reqUrl);
		const post: Post = await res.json();
		return post;
	} catch (e) {
		console.error(`Post with ID of ${id} not found.`, e);
	}
}

const exports = { getAllPosts, getOnePost }
export default exports;