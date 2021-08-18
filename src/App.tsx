import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from './components/Home';
import PostDetails from './components/PostDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from "./components/NotFound";
import Pagination from "./components/Pagination";
import { BlogProvider } from "./contexts/blogContext";

const App = () => {
	return (
		<>
			<Router>
				<BlogProvider>
					<Header />
					<div className="page-content">
						<Switch>
							<Route exact path="/">
								<Redirect to="/blog" />
							</Route>
							<Route exact path="/blog" component={Home} />
							<Route path="/blog/page" component={Pagination} />
							<Route path="/blog/:id" component={PostDetails} />
							<Route path="*" component={NotFound} />
						</Switch>
					</div>
					<Footer />
				</BlogProvider>
			</Router>
		</>
	);
}

export default App;
