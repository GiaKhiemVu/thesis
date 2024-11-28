"use client"

import React, { useEffect } from "react";
import { useAuth } from "../auth/authContext";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { isAuthenticated } = useAuth(); 
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard"); 
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <h1>Redirecting...</h1> 
    </div>
  );
};

export default HomePage;
