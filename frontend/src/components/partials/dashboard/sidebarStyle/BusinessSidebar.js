import React, {useState, useContext, useEffect} from 'react'
import { Link , useLocation} from 'react-router-dom'
import {Accordion, useAccordionButton, AccordionContext} from 'react-bootstrap'
import Scrollbar from 'smooth-scrollbar'
import { useSelector } from 'react-redux'

function CustomToggle({ children, eventKey, onClick }) {

   const { activeEventKey } = useContext(AccordionContext);

   const decoratedOnClick = useAccordionButton(eventKey, (active) => onClick({state: !active, eventKey: eventKey}));

   const isCurrentEventKey = activeEventKey === eventKey;
 
   return (
     <Link to="#" aria-expanded={isCurrentEventKey ? 'true' : 'false'} className="nav-link" role="button" onClick={(e) => {
       decoratedOnClick(isCurrentEventKey)
     }}>
       {children}
     </Link>
   );
 }
const BusinessSidebar = () => { 
   useEffect(
      () =>{
          Scrollbar.init(document.querySelector('#sidebar-scrollbar'))
   })
   const user = useSelector(state => state.authentication.user);


   const [activeMenu, setActiveMenu] = useState(false)
   let location = useLocation();
      return (
         <>
            <div className="iq-sidebar">
               <div id="sidebar-scrollbar">
                  <nav className="iq-sidebar-menu">
                     <Accordion as="ul" id="iq-sidebar-toggle" className="iq-menu">
                        <li className={`${location.pathname === '/business' ? 'active' : ''} `}>
                           <Link to="/business" ><i className="las la-newspaper"></i><span>Analytics</span></Link>
                        </li>
                        <li className={`${location.pathname === `/business/app/company/${user.id}`  ? 'active' : ''}`}>
                           <Link to={`/business/app/company/${user.user_id}`} ><i className="las la-user"></i><span>Profile</span></Link>
                        </li>

                        <li className={`${location.pathname === '/business/app/file' ? 'active' : ''}`}>
                           <Link to={`/business/app/file/${user?.user_id}`} ><i className="las la-file"></i><span>Files</span></Link>
                        </li>
                        <li className={`${location.pathname === '/business/app/chat' ? 'active' : ''}`}>
                           <Link to="/business/app/chat"><i className="lab la-rocketchat"></i><span>Chat</span></Link>
                        </li>


                        
                        

                     
             
                     </Accordion>
                  </nav>
                  <div className="p-5"></div>
               </div>
            </div>
         </>
   )
}

export default BusinessSidebar
