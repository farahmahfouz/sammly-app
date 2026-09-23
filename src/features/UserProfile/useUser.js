import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

function useUser() {
  const { fetchData } = useContext(UserContext);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchData
  });

  return { user, isLoading, error };
}

export default useUser;
