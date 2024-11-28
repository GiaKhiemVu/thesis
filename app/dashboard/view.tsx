"use client"

import React, { useEffect } from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboad-sidebar/dashboard-sidebar";
import { useAuth } from "@/auth/authContext";
import { useRouter } from "next/navigation";
import { selectUserDetail } from "@/redux/selectors/userSelector";
import { getUserInfo } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "@/context/loadingScreenContext";

function DashBoard() {
    const auth = useAuth()
    const router = useRouter()
    const userDetail: UserDetail | null = useSelector(selectUserDetail);
    const dispatch = useDispatch()

    useEffect(() => {
        let pollingInterval: NodeJS.Timeout;
      
        const checkToken = async () => {
            const token = sessionStorage.getItem("accessToken");

            if (token) {
                clearInterval(pollingInterval);
                await getUserInfo(token, dispatch); 
            } else if (!auth.isAuthenticated) {
                router.push("login");
            }
        };
      
        pollingInterval = setInterval(checkToken, 500);

        return () => clearInterval(pollingInterval);
      }, [auth.isAuthenticated]);

    return <>
        <DashboardHeader userDetail={userDetail}/>

        <DashboardSidebar/>
    </>
}

export default DashBoard;
