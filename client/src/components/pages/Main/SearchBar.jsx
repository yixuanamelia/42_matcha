import React, { Component } from 'react';
import Select from 'react-select';
import { GetUserIntrests } from './interest.service';
import Slider from 'rc-slider';
import { fetchAllUsersPublicData } from './Home.service';
import { getUserLocation } from './location.service';

const Range = Slider.Range;

export class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lowerBound: 20,
			upperBound: 40,
			value: [20, 40],
			SearchBar: '',
			rangeFame: 0,
			rangeLocalisation: 20,
			SearchBarTags: '',
			interestsArray: [],
			selectedOption: [],
			location: '',
		};

		this.handleUsersFilter = this.handleUsersFilter.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
	}

	async handleUsersFilter(e) {
		e.preventDefault();
		let filter = [
			{
				userPos: this.state.location,
				rangeFame: this.state.rangeFame,
				age: this.state.value,
				interests: this.state.selectedOption,
				rangeLocalisation: parseInt(this.state.rangeLocalisation),
			},
		];
		let results = await fetchAllUsersPublicData(filter);
		this.props.initUsersData(results);
	}

	onLowerBoundChange = (e) => {
		this.setState({ lowerBound: +e.target.value });
	};
	onUpperBoundChange = (e) => {
		this.setState({ upperBound: +e.target.value });
	};
	onSliderChange = (value) => {
		this.setState({
			value,
		});
	};
	handleApply = () => {
		const { lowerBound, upperBound } = this.state;
		this.setState({ value: [lowerBound, upperBound] });
	};

	async UNSAFE_componentWillMount() {
		const userId = localStorage.getItem('userId');
		let userInterest = await GetUserIntrests(userId);
		this.initInterestArray(userInterest.data);

		let userLocation = await getUserLocation();
		if (this.state.location === '' && userLocation !== '') {
			this.setState({
				location: userLocation,
			});
		}
	}

	handleSelectChange = (selectedOption) => {
		this.setState({ selectedOption });
	};

	initInterestArray(interests) {
		this.setState({
			interestsArray: interests,
		});
	}

	onChange = (e) => {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		// const {valuesearchBar, valuerangeAgeFrom, valuerangeAgeTo, valuerangeFame, valuerangeLocalisation } = this.state;
		return (
			<form style={{ marginBottom: '2rem' }}>
				<div
					className=''
					style={{ display: 'flex', justifyContent: 'space-around' }}>
					<div className='' style={filterStyle}>
						<h3
							style={{
								'font-family': 'Nunito, sans-serif',
								'font-family': 'Yellowtail,cursive',
							}}>
							Age
						</h3>
						<p style={textStyle}>
							From {this.state.value[0]} to {this.state.value[1]}
						</p>
						{/* <p>from {this.state.rangeAgeFrom} years old</p>
                        <input type="range" className="custom-range" id="rangeAgeFrom" name="rangeAgeFrom" min="18" max="79" value={this.state.rangeAgeFrom} onChange={this.onChange} />
                        <p>to {this.state.rangeAgeTo} years old</p>
                        <input type="range" className="custom-range" id="rangeAgeTo" name="rangeAgeTo" min="19" max="80" value={this.state.rangeAgeTo} onChange={this.onChange} /> */}
						<Range
							allowCross={false}
							value={this.state.value}
							onChange={this.onSliderChange}
						/>

						<h3
							style={{
								'font-family': 'Nunito, sans-serif',
								'font-family': 'Yellowtail,cursive',
							}}>
							Fame
						</h3>
						<p style={textStyle}>
							Search users above {this.state.rangeFame} Fame
						</p>
						<input
							type='range'
							className='custom-range'
							id='rangeFame'
							name='rangeFame'
							min='0'
							max='100'
							value={this.state.rangeFame}
							onChange={this.onChange}
						/>
					</div>
					<div className='' style={filterStyle}>
						<h3
							style={{
								'font-family': 'Nunito, sans-serif',
								'font-family': 'Yellowtail,cursive',
							}}>
							Localisation
						</h3>
						<p style={textStyle}>
							Search users {this.state.rangeLocalisation}km
							{`${this.state.rangeLocalisation > 1 ? 's' : ''}`} from you
						</p>
						<input
							type='range'
							className='custom-range'
							id='rangeLocalisation'
							name='rangeLocalisation'
							min='1'
							max='20000'
							value={this.state.rangeLocalisation}
							onChange={this.onChange}
						/>
						<h3
							style={{
								'font-family': 'Nunito, sans-serif',
								'font-family': 'Yellowtail,cursive',
							}}>
							Select Interests
						</h3>
						<Select
							isMulti
							isSearchable
							placeholder='Select your interest'
							value={this.state.selectedOption}
							onChange={this.handleSelectChange}
							options={this.state.interestsArray}
						/>
						<hr style={{ 'margin-top': '10px' }}></hr>
						<span className='input-group-btn'>
							<button
								style={{ 'margin-top': '15px', padding: '10px' }}
								onClick={(e) => {
									this.handleUsersFilter(e);
								}}
								type='Search'
								className='btn btn-light btn-block'>
								Search
							</button>
						</span>
					</div>
				</div>
			</form>
		);
	}
}

const filterStyle = {
	width: '45%',
	float: 'left',
	padding: '1.5rem',
	backgroundColor: '#f0c6dc',
	marginTop: '2rem',
	'border-radius': '20px',
};

const textStyle = {
	'margin-top': '1px',
};

export default SearchBar;
