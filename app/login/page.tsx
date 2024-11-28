import React from "react";
import "./page.css"
import LoginForm from "@/components/login/LoginForm";
import RootLayout from "@/app/layout";

function LoginPage() {
    return <RootLayout>
        <LoginForm/>
    </RootLayout>
}

export default LoginPage;
