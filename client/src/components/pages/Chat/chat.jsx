import React from 'react';
import Navbar from '../common/Navbar/Navbar';
import './chat.css';
import { GetuserChatContact } from '../../services/GetUserChatContact.service';
import Moment from 'moment';
import { GetCurrentUserInfo } from '../../services/FetchCurrentUserInfo.service';
import { saveUserChatAction } from '../../services/SaveUserchatMsg.service';
import { GetuserChatMsg } from '../../services/GetUserChatMessages.service';
import io from 'socket.io-client';

class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			socket: io(process.env.REACT_APP_API_URL),
			firstname: '',
			lastname: '',
			profilePhoto: '',
			msgContent: '',
			allUserChatContact: [],
			messagesInfo: [],
			initChatMessage: (
				<li className='left clearfix'>
					<span className='chat-img1 pull-left'>
						<img
							src='https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg'
							alt='User Avatar'
							className='img-circle'
						/>
					</span>
					<div className='chat-body1 clearfix'>
						<p class='chat-message'>
							Hello I am a robot. Welcome to your chat box choose a user to
							start chatting.
						</p>
						<div
							className=''
							style={{
								'font-size': '11px',
								'font-family': 'Kumbh Sans, sans-serif',
								'padding-left': '10px',
							}}>
							09:40PM
						</div>
					</div>
				</li>
			),
		};

		this.sendMessageToUser = this.sendMessageToUser.bind(this);
		this.selectChatContact = this.selectChatContact.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		let room = localStorage.getItem('userId');
		this.state.socket.connect(true);
		this.state.socket.emit('join', room);
		this.state.socket.on('send-new-msg', (msg) => {
			if (this.state.messagesInfo.dest_userId !== undefined) {
				let allMsg = this.state.messagesInfo;
				allMsg.messages.push(msg);
				this.setState({
					messagesInfo: allMsg,
				});
				// var elmnt = document.getElementById("content");
				// elmnt.scrollIntoView();
			}
		});
	}

	handleChange(event) {
		event.preventDefault();
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	sendMessageToUser(e) {
		e.preventDefault();
		let Allmessages = [];
		let socketMsg = {};
		if (
			this.state.messagesInfo.length !== 0 &&
			this.state.messagesInfo.messages
		) {
			Allmessages = this.state.messagesInfo;
			socketMsg = {
				pos: 'left',
				photo: this.state.profilePhoto,
				msgData: this.state.msgContent,
				data: Moment(),
			};

			Allmessages.messages.push({
				pos: 'right',
				photo: this.state.profilePhoto,
				msgData: this.state.msgContent,
				data: Moment(),
			});
			this.setState({
				messagesInfo: Allmessages,
			});

			saveUserChatAction(Allmessages);

			setTimeout(() => {
				this.state.socket.emit('new-msg', {
					msg: socketMsg,
					room: this.state.messagesInfo.dest_userId,
				});
				this.setState({
					msgContent: '',
				});

				let data = {
					id:
						parseInt(this.state.messagesInfo.source_userId) +
						parseInt(this.state.messagesInfo.dest_userId),
					title: 'message',
					fullname: '',
					msg: ' messaged you on chatApp ',
					likerId: parseInt(this.state.messagesInfo.source_userId),
					likedId: parseInt(this.state.messagesInfo.dest_userId),
					time: Moment(),
				};
				this.state.socket.emit('likeUser', data);
			}, 200);
		} else {
			console.log('Please choose a user to chat with !');
		}

		// var elmnt = document.getElementById("content");
		// elmnt.scrollIntoView();
	}

	async UNSAFE_componentWillMount() {
		let userId = localStorage.getItem('userId');
		let profileData = await GetCurrentUserInfo(userId);
		if (profileData.data) this.initProfileInformation(profileData.data);

		let contactData = await GetuserChatContact();

		if (contactData !== '' && contactData.code === 200) {
			this.setState({
				allUserChatContact: contactData.data,
			});
		}
	}

	async selectChatContact(e, user) {
		e.preventDefault();
		let userId = localStorage.getItem('userId');
		let userChatMsg = await GetuserChatMsg(user.userId);

		if (userChatMsg !== '' && userChatMsg.code === 200) {
			this.initMegList(userChatMsg.data);
		}

		// Get all user messages sorted by date
		// init user objs
		this.setState({
			messagesInfo: {
				dest_userId: user.userId,
				source_userId: userId,
				dest_fullname: user.fullname,
				dest_photo: user.profilePhoto,
				messages: [],
			},
		});

		setTimeout(() => {
			// var elmnt = document.getElementById("content");
			// elmnt.scrollIntoView();
		}, 20);
	}

	getProfilePicture(pictures, state) {
		let pics = [];
		let i = 0;
		while (i < pictures.length) {
			if (pictures[i].state === state) pics.push(pictures[i].path);
			i++;
		}

		return pics;
	}

	initProfileInformation(data) {
		let userInfo = data.info;
		let profilePhoto = this.getProfilePicture(data.pictures, 1);

		this.setState({
			firstname: userInfo.firstname,
			lastname: userInfo.lastname,
			profilePhoto: profilePhoto.length > 0 ? profilePhoto : '',
		});
	}

	initMegList(msgs) {
		if (msgs && msgs.length > 0) {
			let msgsList = [];
			msgsList = msgs.map((msg) => {
				return {
					pos:
						msg.source_user_id ===
							parseInt(this.state.messagesInfo.source_userId)
							? 'right'
							: 'left',
					photo:
						msg.source_user_id ===
							parseInt(this.state.messagesInfo.source_userId)
							? this.state.profilePhoto
							: this.state.messagesInfo.dest_photo,
					msgData: msg.message_text,
					date: msg.createdAt,
				};
			});

			let msgInfo = this.state.messagesInfo;
			msgInfo.messages = msgsList;
			this.setState({
				messagesInfo: msgInfo,
			});
		}
	}

	render() {
		let styleLeft = {
			fontSize: '11px',
			fontFamily: 'Kumbh Sans, sans-serif',
			paddingLeft: '10px',
		}

		return (
			<div>
				<Navbar />

				<div className='chatroom-wdg'>
					<div className='chat_sidebar'>
						<div className='row'>
							<div id='custom-search-input'>
								<div className='input-group col-md-12'>
									<input
										type='text'
										className='  search-query form-control'
										placeholder='Conversation'
									/>
									<button className='btn btn-danger' type='button'>
										<span className=' glyphicon glyphicon-search'></span>
									</button>
								</div>
							</div>

							<div className='member_list'>
								<ul className='list-unstyled'>
									{this.state.allUserChatContact
										? this.state.allUserChatContact.map((user, i) => {
											return user.profilePhoto !== '' ? (
												<li
													key={i}
													onClick={(e) => {
														this.selectChatContact(e, user);
													}}
													className='left clearfix'>
													<span className='chat-img pull-left'>
														<img
															src={
																user.profilePhoto
																	.toString()
																	.substring(0, 5) === 'https'
																	? user.profilePhoto
																	: process.env.REACT_APP_API_URL +
																	'/' +
																	user.profilePhoto
															}
															alt='User Avatar'
															className='img-circle'
														/>
													</span>
													<div className='chat-body clearfix'>
														<div className='header_sec'>
															<strong className='primary-font'>
																{user.fullname}
															</strong>
															{/* <strong className="pull-right"> */}
															{/* 09:45AM</strong> */}
														</div>
														<div className='contact_sec'>
															{/* <strong className="primary-font">(123) 123-456</strong> <span className="badge pull-right">3</span> */}
														</div>
													</div>
												</li>
											) : (
													''
												);
										})
										: ''}
								</ul>
							</div>
						</div>
					</div>

					<div className='message_section'>
						<div className='row'>
							<div className='chat_area'>
								<ul className='list-unstyled'>
									{this.state.messagesInfo.length === 0
										? this.state.initChatMessage
										: ''}
									{this.state.messagesInfo.length !== 0 &&
										this.state.messagesInfo.messages.length === 0 ? (
											<li className='left clearfix'>
												<div className='chat-body1 clearfix'>
													<p>
														Now chatting with{' '}
														<b>{this.state.messagesInfo.dest_fullname}</b>
													</p>
													<div className='chat_time pull-right'>09:40PM</div>
												</div>
											</li>
										) : (
											''
										)}

									{/* <li className="left clearfix">
                                                               <span className="chat-img1 pull-left">
                                                                  <img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar" className="img-circle" />
                                                               </span>
                                                               <div className="chat-body1 clearfix">
                                                                  <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.</p>
                                                                  <div className="chat_time pull-right">09:40PM</div>
                                                               </div>
                                                            </li> */}

									{this.state.messagesInfo.length !== 0 &&
										this.state.messagesInfo.messages.length > 0
										? this.state.messagesInfo.messages.map((msg, i) => {
											return (
												<li key={i} className='left clearfix admin_chat'>
													<span className={'chat-img1 pull-' + msg.pos}>
														<img
															src={
																msg.photo.toString().substring(0, 5) ===
																	'https'
																	? msg.photo
																	: process.env.REACT_APP_API_URL +
																	'/' +
																	msg.photo
															}
															alt='User Avatar'
															className='img-circle'
														/>
													</span>
													<div style={{marginLeft:  msg.pos == "left" ? '50px' : "0px"}} className='chat-body1 clearfix'>
														<p style={{background: msg.pos == "left" ? "silver" : "#666666"}} >{msg.msgData}</p>
														<div className='chat_time pull-left'>
															{Moment(msg.date).fromNow()}
														</div>
													</div>
												</li>
											);
										})
										: ''}

									{/* <li className='left clearfix admin_chat'>
										<span className={'chat-img1 pull-left'}>
											<img
												src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg"
												alt='User Avatar'
												className='img-circle'
											/>
										</span>
										<div style={{marginLeft: '50px'}} className='chat-body1 clearfix'>
											<p style={{background: "silver"}} >Lorem ipsum dolor sit amet consectetur.</p>
											<div className='chat_time pull-left'>
												12/02/2020 12:30pm
											</div>
										</div>
									</li>


									<li className='left clearfix admin_chat'>
										<span className={'chat-img1 pull-right'}>
											<img
												src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg"
												alt='User Avatar'
												className='img-circle'
											/>
										</span>
										<div className='chat-body1 clearfix'>
											<p>Lorem ipsum dolor sit amet consectetur.</p>
											<div className='chat_time pull-right'>
												12/02/2020 12:30pm
											</div>
										</div>
									</li>

									<li style={{ marginBottom: '1.5vw' }} id='content'></li> */}
								</ul>
							</div>

							<div className='message_write'>
								<textarea
									className='form-control'
									name='msgContent'
									value={this.state.msgContent}
									onChange={this.handleChange}
									placeholder='type a message'></textarea>
								<div className='clearfix'></div>
								<div
									onClick={(e) => {
										this.sendMessageToUser(e);
									}}
									className='chat_bottom'>
									<a href='#' className='pull-left btn btn-success'>
										Send
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Chat;