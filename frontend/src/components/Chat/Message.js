import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';

export default function Message({user,chat,index,message}) {

    return (
        <div className={`chat ${message.fromUserId === user.user_id ? "chat-left" : "d-flex other-user"}`}>
        <div className="chat-user">
         
                <img src={message.profile_pic} alt="avatar" className="rounded-circle avatar-35 "/>
           
            <span className="chat-time mt-1">{moment(message.createdAt).fromNow()}</span>
        </div>
        <div className="chat-detail">
            <div className="chat-message">
                <p>{message.message}</p>
            </div>
        </div>
    </div>
    )
}
