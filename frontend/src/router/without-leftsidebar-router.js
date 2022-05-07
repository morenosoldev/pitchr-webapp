import React from 'react'
import {Switch,Route} from 'react-router-dom'
import index from '../views/Investor';

const WithoutLeftSidebarRouter = () => {
    return (
        <>
            <Switch>
                <Route  path="/without-leftsidebar"   component={index}/>
            </Switch>
        </>
    )
}

export default WithoutLeftSidebarRouter;