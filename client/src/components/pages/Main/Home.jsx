import React from 'react';
import SearchBar from './SearchBar';
import ResultUser from './ResultUser';

import Navbar from '../common/Navbar/Navbar';

import { fetchAllUsersPublicData } from './Home.service';
import sort from 'fast-sort';
import { GetUserIntrests } from './interest.service';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sortBy: 'age',
			initialUsers: [],
			interestsArray: [],
			userBuffer: [],
		};

		this.onChange = this.onChange.bind(this);
		this.filterUsers = this.filterUsers.bind(this);
		this.updateSearch = this.updateSearch.bind(this);
	}

	async UNSAFE_componentWillMount() {
		let userData = await fetchAllUsersPublicData([]);
		this.initUsers(userData);

		const userId = localStorage.getItem('userId');
		let userInterest = await GetUserIntrests(userId);
		this.initInterestArray(userInterest.data);
	}

	onChange = async (e) => {
		if (e.target.name !== 'sortBy') {
			e.preventDefault();
		}
		this.setState({ [e.target.name]: e.target.value });

		setTimeout(async () => {
			await this.filterUsers();
		}, 50);
		// await this.filterUsers();
		// console.log(this.state[e.target.name]);
	};

	initUsers(users) {
		this.setState({
			initialUsers: users,
			userBuffer: users,
		});
	}

	updateSearch(data) {
		this.setState({
			initialUsers: data,
			userBuffer: data,
		});
	}

	initInterestArray(interests) {
		this.setState({
			interestsArray: interests,
		});
	}

	async filterUsers() {
		let buffer = [];
		buffer = this.state.initialUsers;
		//SORT
		//sort by fame and age
		if (this.state.sortBy === 'fame' || this.state.sortBy === 'age') {
			buffer = sort(buffer).asc((u) => u[this.state.sortBy]);
			console.log(buffer);
			this.setState({
				userBuffer: buffer,
			});
			//sort by distance
		} else if (this.state.sortBy === 'location') {
			buffer = sort(buffer).asc((u) => u.distance);
			this.setState({
				userBuffer: buffer,
			});
			//sort by tags
		} else if (this.state.sortBy === 'tags') {
			var tags = [];
			if (this.state.interestsArray !== null) {
				this.state.interestsArray.forEach((element) => {
					tags.push(element.value);
				});
			}
			var newbuffer = [];
			tags.forEach((tagfromlist) => {
				buffer.forEach((element) => {
					element.tags.forEach((taguser) => {
						if (taguser === tagfromlist) {
							newbuffer.push(element);
						}
					});
				});
			});
			buffer = newbuffer;
			this.setState({
				userBuffer: buffer,
			});
		}
	}

	render() {
		let filteredUsers = this.state.userBuffer;

		return (
			<div>
				<Navbar />
				<div className=''>
					<section className='filter-area'>
						<br />
						<SearchBar initUsersData={this.updateSearch} />
						<div style={{ padding: '2rem' }}>
							<div
								style={{
									height: '2rem',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									'border-radius': '15px',
								}}>
								{' '}
								<p
									style={{
										color: '#443737',
										'font-size': '25px',
										'padding-bottom': '10px',
										'font-family': 'Nunito, sans-serif',
										'font-family': 'Yellowtail,cursive',
									}}>
									Sorted By
								</p>
							</div>
							<div
								style={{
									backgroundColor: '#443737',
									height: '4rem',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									'text-color': 'white',
									'font-size': '15px',
									'border-radius': '15px',
								}}>
								<div style={somemargin}>
									<div>Age</div>
									<input
										type='radio'
										name='sortBy'
										value='age'
										checked={this.state.sortBy === 'age'}
										onChange={this.onChange}
									/>
								</div>
								<div style={somemargin}>
									<div>Distance</div>
									<input
										type='radio'
										name='sortBy'
										value='location'
										checked={this.state.sortBy === 'location'}
										onChange={this.onChange}
									/>
								</div>
								<div style={somemargin}>
									<div>Tags</div>
									<input
										type='radio'
										name='sortBy'
										value='tags'
										checked={this.state.sortBy === 'tags'}
										onChange={this.onChange}
									/>
								</div>
								<div style={somemargin}>
									<div>Fame</div>
									<input
										type='radio'
										name='sortBy'
										value='fame'
										checked={this.state.sortBy === 'fame'}
										onChange={this.onChange}
									/>
								</div>
							</div>
						</div>
						<ResultUser users={filteredUsers} />
					</section>
				</div>
			</div>
		);
	}
}

const somemargin = {
	textAlign: 'center',
	width: '24%',
	color: 'white',
};

export default Home;
