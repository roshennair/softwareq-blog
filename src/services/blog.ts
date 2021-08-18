import Post from "../interfaces/Post";

const {
	REACT_APP_SUB_KEY = '8264bdc50b8349639de07372b9edf53b',
	NODE_ENV
} = process.env;
const apiEndpoint = NODE_ENV === 'production' ? '/api' : '';

const getAllPosts = async () => {
	const reqUrl = `${apiEndpoint}/ListAll?softwareq-apim-subscription-key=${REACT_APP_SUB_KEY}`;
	try {
		const res = await fetch(reqUrl);
		const posts: Post[] = await res.json();
		return posts;
	} catch (e) {
		console.log('Error fetching all posts.');
		return [];
	}
}

const getOnePost = async (id: number) => {
	const reqUrl = `${apiEndpoint}/ById?id=${id}&softwareq-apim-subscription-key=${REACT_APP_SUB_KEY}`;
	try {
		const res = await fetch(reqUrl);
		const post: Post = await res.json();
		return post;
	} catch (e) {
		console.error(`Post with ID of ${id} not found.`);
		return null;
	}
}

const exports = { getAllPosts, getOnePost }
export default exports;