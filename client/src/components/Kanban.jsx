import "../assets/scss/kanban.scss";

const Kanban = () => {
	return (
		<>
			<div className="kanban">
				<div className="col">
					<h3>To Do</h3>
					<div className="card high">
						<h4>Title</h4>
						<date>23-08-2021</date>
						Description
					</div>
					<div className="card mid">
						<h4>Title</h4>
						<date>23-08-2021</date>
						Description
					</div>
				</div>
				<div className="col">
					<h3>In Progress</h3>

					<div className="card">
						<h4>Title</h4>
						<date>23-08-2021</date>
						Description
					</div>
				</div>
				<div className="col">
					<h3>Done</h3>

					<div className="card">
						<h4>Title</h4>
						<date>23-08-2021</date>
						Description
					</div>
				</div>
			</div>
		</>
	);
};

export default Kanban;
