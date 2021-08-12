const api = 'https://softwareq-merdeka-api.azure-api.net/blog/v1';
const subscriptionKey = process.env.REACT_APP_SUB_KEY || '8264bdc50b8349639de07372b9edf53b ';

interface Post {
	id: number,
	title: string,
	createdAt: Date,
	createdAtDateTimeOffset: Date,
	createdBy: string,
	mainAuthor: string | null,
	secondaryAuthor: string | null,
	otherAuthors: string[],
	content: string,
	linkToHeaderImage: string,
	copyrightOwner: string,
	isPublished: boolean
}

const getAll = async () => {
	const res = await fetch(`${api}/ListAll?softwareq-apim-subscription-key=${subscriptionKey}`);
	const posts: Post[] = await res.json();
	return posts;
}

const getOne = async (id: number) => {
	try {
		const res = await fetch(`${api}/ById?id=${id}softwareq-apim-subscription-key=${subscriptionKey}`);
		const post: Post = await res.json();
		return post;
	} catch (e) {
		console.error(`Post with ID of ${id} not found.`, e);
	}
}

export { getAll, getOne };