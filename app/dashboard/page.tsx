import React from "react";
import RootLayout from "@/app/layout";
import DashboardHeader from "@/components/dashboard/dashboard-header/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboad-sidebar/dashboard-sidebar";

function DashBoardPage() {
    return <RootLayout>
        <DashboardHeader/>

        <DashboardSidebar/>
    </RootLayout>
}

export default DashBoardPage;
