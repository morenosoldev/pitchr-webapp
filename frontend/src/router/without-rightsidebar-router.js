import React from 'react'
import {Switch,Route} from 'react-router-dom'
import index from '../views/Investor';


const WithoutRightSidebarRouter = () => {
    return (
        <>
            <Switch>
                <Route  path="/without-rightsidebar"   component={index}/>
            </Switch>
        </>
    )
}

export default WithoutRightSidebarRouter;