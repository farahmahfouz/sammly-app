import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../utils/api/userApi";
import { useAuth } from "../../context/AuthContext";

export function useUser() {
  const { token } = useAuth();

  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    enabled: !!token,
    retry: false,
    staleTime: 5 * 60 * 1000, 
  });

  return { isLoading, user, userId: user?._id };
}