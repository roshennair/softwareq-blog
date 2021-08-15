import './Loader.css';

const Loader = ({ isLoading }: { isLoading: boolean }) => {
	return isLoading
		? (
			<div className="lds-container">
				<div className="lds-ring">
					<div>
					</div>
					<div>
					</div>
					<div>
					</div>
					<div>
					</div>
				</div>
			</div>
		)
		: <></>
}

export default Loader;