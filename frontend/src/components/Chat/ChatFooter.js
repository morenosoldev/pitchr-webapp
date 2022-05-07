import React, {useState} from 'react'
import { Form,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux'

export default function ChatFooter({chat}) {

    const user = useSelector(state => state.authentication.user)
    const socket = useSelector(state => state.chat.socket)

    const [message, setMessage] = useState('')

    const handleMessage = (e) => {
        const value = e.target.value
        setMessage(value)

        const receiver = {
            chatId: chat.id,
            fromUser: user,
            toUserId: chat.Users.map(user => user.id),
        }

        if (value.length === 1) {
            receiver.typing = true
            socket.emit('typing', receiver)
        }

        if (value.length === 0) {
            receiver.typing = false
            socket.emit('typing', receiver)
        }

        // notify other users that this user is typing something
    }


    const sendMessage = (e) => {
        e.preventDefault()

        const msg = {
            type: 'text',
            fromUser: user,
            toUserId: chat.Users.map(user => user.id),
            chatId: chat.id,
            message: message,
            profile_pic: user.profile_pic
        }

        setMessage('')
        // send message with socket
        socket.emit('message', msg)
    }


    return (
        <div className="chat-footer p-3 bg-white">
        <Form className="d-flex align-items-center" action="#">
            <div className="chat-attagement d-flex">
                <Link to="#"><i className="far fa-smile pe-3" aria-hidden="true"></i></Link>
                <Link to="#"><i className="fa fa-paperclip pe-3" aria-hidden="true"></i></Link>
            </div>
            <Form.Control type="text"  value={message} onChange={(e) => handleMessage(e)} className="form-control me-3" placeholder="Type your message"/>
            <Button type="submit" onClick={(e) => sendMessage(e)} className=" primary d-flex align-items-center p-2"><i className="far fa-paper-plane" aria-hidden="true"></i><span className="d-none d-lg-block ms-1">Send</span></Button>
        </Form>
    </div>
    )
}
