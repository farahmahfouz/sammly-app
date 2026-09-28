import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { createReview } from "../../utils/api/reviewsApi";
import { toast } from "react-toastify";

function useCreateReview() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => createReview(id, data),
    onSuccess: () => {
      toast.success("Review added sucessfully");
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
    },
  });

  return { addReview: mutate, isPending };
}

export default useCreateReview;
