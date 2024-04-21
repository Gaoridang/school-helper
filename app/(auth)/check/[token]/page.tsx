// page.js or page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import LoadingComponent from "./LoadingComponent";

interface Props {
  params: { token: string };
}

const RoleCheckPage = ({ params: { token } }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await axiosInstance.get(`/api/check?token=${token}`);
        router.push(res.data.redirect);
      } catch (error) {
        if (error instanceof AxiosError) {
          // Handle the error appropriately
          console.error("Error:", error);
        }
        setIsLoading(false);
      }
    };

    checkRole();
  }, [token, router]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return null;
};

export default RoleCheckPage;
