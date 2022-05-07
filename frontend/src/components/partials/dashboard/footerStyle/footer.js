import React,{useState} from 'react'
import { Link} from 'react-router-dom'
import {Row, Col, Container, Button} from 'react-bootstrap'
import {bindActionCreators} from "redux"
import {ModeAction, DirAction} from '../../../../store/actions/action.mode'
import { getDarkMode,getRtlMode} from '../../../../store/reducers/mode.reducer'
import {connect} from "react-redux"



const mapStateToProps = (state) => {
    return {
        darkMode: getDarkMode(state),
        rtlMode: getRtlMode(state),
    };
}
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            ModeAction,
            DirAction,
        },
        dispatch
    )
})


const Footer = ({scrollDown, scrollUp,up,down}) => {
    

    return (
            <>
                <footer className="new-footer">
                        <ul style={{display:'flex', width:175, justifyContent:'space-evenly'}} className="list-inline mb-0">
       <button onClick={() => scrollUp()} className={`circle ${up ? 'pulse': null} orange`}><i class="fas fa-chevron-up" style={{color:'#FF9C1A'}}></i></button>
       <button onClick={() => scrollDown()} className={`circle ${down ? 'pulse': null} orange`}><i class="fas fa-chevron-down" style={{color:'#FF9C1A'}}></i></button>
                        </ul>
                </footer>
            </>
        )
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)