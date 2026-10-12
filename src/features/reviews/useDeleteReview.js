import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../../utils/api/reviewsApi";
import toast from "react-hot-toast";


export default function useDeleteReview() {
    const queryClient = useQueryClient();
    const { mutate: removeReview, isPending } = useMutation({
        mutationFn: (reviewId) => deleteReview(reviewId),
        onSuccess: () => {
            toast.success('Review deleted successfully'),
            queryClient.invalidateQueries({queryKey: ['reviews']})
        }
    })

    return { removeReview, isPending}
}