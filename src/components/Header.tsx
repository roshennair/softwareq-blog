import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
	return (
		<header>
			<Link to='/blog'>SoftwareQ Blog</Link>
		</header>
	)
}

export default Header;
