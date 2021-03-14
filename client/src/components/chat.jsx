import { useState, useContext, useEffect } from "react";
import { DataStore } from "../context/DataStore";
import "../assets/scss/chat.scss";

const Chat = ({ project }) => {
	const { userData, db, firebase } = useContext(DataStore);
	const [msg, setMsg] = useState("");
	const [msgs, setMsgs] = useState([]);
	useEffect(() => {
		let unsub = db
			.doc(`projects/${project.id}/extras/chat`)
			.onSnapshot((doc) => {
				if (doc.exists) {
					setMsgs(doc.data().msg);
				}
			});
		return () => {
			unsub && unsub();
		};
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(msg);
		db.doc(`projects/${project.id}/extras/chat`).update({
			msg: firebase.firestore.FieldValue.arrayUnion({
				msg: msg,
				sender: userData.email,
				time: firebase.firestore.Timestamp.fromDate(new Date()),
			}),
		});
		setMsg("");
	};
	return (
		<div className="page project-space">
			<div className="tab">
				<div className="top-bar">
					<h1 className="title">Team Chat</h1>
				</div>
				<main className="msger-chat">
					{msgs?.map((m, index) => (
						<Msg msg={m} key={index} userData={userData} />
					))}
				</main>
				<div className="bod">
					<div className="send">
						<form className="msger-inputarea" onSubmit={handleSubmit}>
							<input
								type="text"
								className="msger-input"
								placeholder="Enter your message..."
								value={msg}
								onChange={(e) => setMsg(e.target.value)}
							/>
							<button type="submit" className="msger-send-btn">
								Send<i className="fa fa-paper-plane" aria-hidden="true"></i>
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

const toDate = (time) => {
	const date = time?.toDate().toString().split(" ");
	return `${date[2]} ${date[1]} ${date[3]} ${date[4]}`;
};

const Msg = ({ msg, userData }) => {
	const check = msg.sender == userData.email;
	return (
		<main className="msger-chat">
			<div className={check ? "msg right-msg" : "msg left-msg"}>
				<div className="msg-img">
					<img src={check ? userData.photoURL : null} alt="" />
				</div>

				<div className="msg-bubble">
					<div className="msg-info">
						<div className="msg-info-name">{msg.sender}</div>
						<div className="msg-info-time">{toDate(msg.time)}</div>
					</div>

					<div className="msg-text">{msg.msg}</div>
				</div>
			</div>
		</main>
	);
};

export default Chat;
