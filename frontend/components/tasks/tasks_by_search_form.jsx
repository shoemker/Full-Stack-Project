import React from 'react';
import NavbarContainer from '../navbar/navbar_container'
import { Link } from 'react-router-dom';

class TasksBySearch extends React.Component {

	componentDidMount() {
		this.props.fetchTasks();
		
	}


	greeting() {

		if (!this.props.currentUser) {
			return (
				<div className="tasks-cat-greeting-con">
					<Link to="/login" style={{ textDecoration: 'none' }} >
						<h2 className="task-cat-greeting">Please Log In to do these tasks</h2>
					</Link>
				</div>
			)
		}
	}


	render() {
		let searchWords;
		debugger
		if (this.props.searchTerm.search.length > 0) searchWords = this.props.searchTerm.search.split(" ");

		const ignore = ["the", "a", "an", "for"]

		let tasksSelected = [];

		(this.props.tasks.length > 0) && this.props.tasks.forEach((task) => {
			for (let i = 0; i < searchWords.length; i++) {
				if (!ignore.includes(searchWords[i]) &&
					 (task.brief.toLowerCase().includes(searchWords[i]) ||
							task.description.toLowerCase().includes(searchWords[i])))
					tasksSelected.push(task);					
			}
			// if () 
			// {
			// 	tasksSelected.push(task);
			// }
		})

		return (
			<div className="tasks-by-cat-background">
				<header>
					<NavbarContainer />
				</header>
				{this.greeting()}
				<div className='parent-task-container'>
					{this.props.tasks.length > 0 && tasksSelected.map((task) => {
						return (
							// <h2>{this.props.searchTerm.search}</h2>
							<div className='task-container'>

								<p className="task-brief"> {task.brief}</p>
								<p className='task-fields-1'>Description: {task.description}	</p>
								<p className='task-fields-2'>Location: {task.location}</p>
								<p className='task-fields-3'>Need a Vehicle? : {task.vehicle_needed ? "yes" : "no"}</p>

							</div>
						)
					})}
				</div>

			</div>
		)
	}
}

export default TasksBySearch;