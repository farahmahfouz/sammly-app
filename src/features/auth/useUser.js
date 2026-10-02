import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../utils/api/userApi";
import { useAuth } from "../../context/AuthContext";

export function useUser() {
  const { isLoggedIn } = useAuth();

  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    enabled: isLoggedIn,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return { isLoading, user, userId: user?._id };
}