import React from 'react'


//router
import { Switch,Route} from 'react-router'
import { LinkedInCallback } from 'react-linkedin-login-oauth2';
//layoutpages
import InvestorDashboard from '../layouts/dashboard/InvestorDashboard'
import WithoutLeftSidebar from '../layouts/dashboard/without-leftsidebar'   
import WithoutRightSidebar from '../layouts/dashboard/without-rightsidebar'   
import Simple from '../layouts/dashboard/simple'
import BusinessDashboard from '../layouts/dashboard/BusinessDashboard'
import Business from '../views/LandingPage/Business'
import Investor from '../views/LandingPage/Investor'
import PartnerPage from '../views/LandingPage/PartnerPage'
import LandingPage from '../views/LandingPage/LandingPage'
import Blog from '../views/LandingPage/Blog';
import Chat from '../views/dashboard/app/chat'
import PrivacyPolicy from '../views/LandingPage/PrivacyPolicy'

const IndexRouters = () => {
    return (
        <>
            <Switch>
                <Route  path="/without-leftsidebar"     component={WithoutLeftSidebar}></Route>
                <Route  path="/without-rightsidebar"    component={WithoutRightSidebar}></Route>
                <Route  path="/auth"                    component={Simple}></Route>
                <Route  path="/errors"                  component={Simple}></Route>

                <Route  path="/startup" component={Business}></Route>
                <Route  path="/investors" component={Investor}></Route>
                <Route  path="/partners" component={PartnerPage}></Route>
                <Route exact path="/" component={LandingPage}></Route>
                <Route path="/blog" component={Blog}></Route>
                <Route exact path="/linkedin" component={LinkedInCallback} />
                <Route path="/privacy" component={PrivacyPolicy}></Route>


                <Route  path="/extra-pages"             component={Simple}></Route>
                
                <Route  path="/business"                component={BusinessDashboard}></Route>
                <Route  path="/investor"                component={InvestorDashboard}></Route>
              
            </Switch>
        </>
    )
}

export default IndexRouters
