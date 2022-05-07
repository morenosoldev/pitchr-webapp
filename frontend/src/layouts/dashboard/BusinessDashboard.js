import React from 'react'
import Header from '../../components/partials/dashboard/headerStyle/header'
import RightSidebar from '../../components/partials/dashboard/sidebarStyle/rightsidebar'
import Footer from '../../components/partials/dashboard/footerStyle/footer'
import BusinessRouter from '../../router/BusinessRouter'
import BusinessSidebar from '../../components/partials/dashboard/sidebarStyle/BusinessSidebar'


export default function BusinessDashboard() {
    return (
        <>
        <div className="wrapper">
            <Header />
            <div id="content-page" className="content-page">
                <BusinessRouter/>
            </div>
        </div>
    </>
    )
}
