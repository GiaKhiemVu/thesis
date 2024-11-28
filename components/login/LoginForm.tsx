'use client'

import { useAuth } from "@/auth/authContext";
import { useToast } from "@/context/toastContext";
import { selectAccessToken } from "@/redux/selectors/userSelector";
import { UserValidationUtils } from "@/utils/validation";
import { Card, Typography, InputLabel, FormControl, Button } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

function LoginForm() {
    const toast = useToast()
    const authContext = useAuth()
    const [account, setAccount] = useState("")
    const [password, setPassword] = useState("")

    const onClickSubmit = (event: FormEvent) => {
        event.preventDefault();
        toast.showToast(`Logging in!`)
        authContext.login(account, password)
    }

    return <>
        <div className="login-container">
            <Card sx={{ width: '30%', padding: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <form className="login-form" onSubmit={(event) => onClickSubmit(event)}>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <FormControl fullWidth margin="normal">
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            style={{
                                padding: "12px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                                width: "90%",
                            }}
                            onChange={(event) => { setAccount(event.target.value) }}
                        />
                    </FormControl>

                    <InputLabel htmlFor="password">Password</InputLabel>
                    <FormControl fullWidth margin="normal">
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            style={{
                                padding: "12px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                                width: "90%",
                            }}
                            onChange={(event) => { setPassword(event.target.value) }}
                        />
                    </FormControl>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ padding: "12px", marginTop: "20px" }}
                        type="submit"
                        disabled={
                            !UserValidationUtils.validateAccount(account) || !UserValidationUtils.validatePassword(password)
                        }
                    >
                        Login
                    </Button>
                </form>
            </Card>
        </div>
    </>
}

export default LoginForm