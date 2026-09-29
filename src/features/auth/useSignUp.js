import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signUp as signUpApi } from "../../utils/api/userApi";
import { toast } from "react-toastify";

export default function useSignUp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: (data) => signUpApi(data),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { signUp, isLoading };
}
