import { Link } from "react-router-dom";
import './NotFound.css';

const NotFound = () => {
	return (
		<div className="not-found">
			<h1>404 Not Found</h1>
			<p>The page you requested could not be found. <Link to='/blog'>Return to the homepage</Link>.</p>
		</div>
	)
}

export default NotFound;