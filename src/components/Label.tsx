import './Label.css';

interface Props {
	text: string;
	type: 'category' | 'tag';
}

const Label = ({ text, type }: Props) => {
	return <div className={type}>{text}</div>;
}

export default Label;