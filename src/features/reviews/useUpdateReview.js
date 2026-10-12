import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview } from "../../utils/api/reviewsApi";
import { toast } from "react-hot-toast";

export default function useUpdateReview() {
  const queryClient = useQueryClient();

  const { mutate: editReview, isPending } = useMutation({
    mutationFn: ({ reviewId, data }) => updateReview(reviewId, data),
    onSuccess: () => {
      toast.success("Review edited sucessfully");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  return { editReview, isPending };
}
