import React from 'react'

//header
import Header from '../../components/partials/dashboard/headerStyle/header'

//sidebar
import RightSidebar from '../../components/partials/dashboard/sidebarStyle/rightsidebar'


//footer
import Footer from '../../components/partials/dashboard/footerStyle/footer'

//default 
import InvestorRouter from '../../router/InvestorRouter'
import InvestorSidebar from '../../components/partials/dashboard/sidebarStyle/InvestorSidebar'


const InvestorDashboard = () => {
    return (
        <>
            <div className="wrapper">
                <Header />
                <div id="content-page" className="content-page">
                    <InvestorRouter/>
                </div>
            </div>
        </>
    )
}

export default InvestorDashboard
