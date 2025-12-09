import React from "react";
import useAuth from "./useAuth";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
    const {user} = useAuth()
    const axiosInstance = useAxios()

    const {isLoading, data: role = 'student'} = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      // search user role type
      const res = await axiosInstance.get(`/users/${user?.email}/role`);

      return res.data.role;
    },
    enabled: !!user?.email,
  });

  return {role, isLoading}
  
};

export default useRole;
