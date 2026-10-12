import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import RatingStars from "./RatingStarts";
import useProductReview from "./useProductReview";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import ConfirmModal from "../../components/ConfirmModal";
import useDeleteReview from "./useDeleteReview";

const PAGE_SIZE = 1;

function ReviewsList({ onEdit }) {
  const { reviews, isLoading } = useProductReview();
  const { removeReview } = useDeleteReview();

  const [visible, setVisible] = useState(PAGE_SIZE);

  const { isLoggedIn, userId } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);


  const handleDeleteConfirm = (id) => {
    setReviewToDelete(id);
    setShowModal(true);
  };

  const handleDeleteCancel = () => {
    setReviewToDelete(null);
    setShowModal(false);
  };

  const handleDeleteConfirmed = () => {
    if (reviewToDelete) {
      removeReview(reviewToDelete);
    }

    setReviewToDelete(null);
    setShowModal(false);
  };


  if (isLoading) return null;
  if (!reviews?.length) return null;

  return (
    <section className="w-full">
      <span className="flex flex-col gap-1 pb-4 text-primary">
        <h2 className="text-xs font-semibold uppercase tracking-tighter">
          what our customer say
        </h2>
        <p className="text-lg md:text-3xl font-extrabold capitalize text-textPrimary">
          real people. real stories.
        </p>
      </span>

      <div className="flex flex-col gap-3">
        {reviews.slice(0, visible).map((review) => {
          const owner = isLoggedIn && userId && review.user?._id === userId;
          return (
            <div
              key={review._id}
              className="relative flex gap-4 rounded-lg border border-borderLight p-4"
            >
              {owner && (
                <div className="dropdown dropdown-end absolute top-3 right-3">
                  <button
                    type="button"
                    tabIndex={0}
                    className="btn btn-circle btn-ghost btn-sm bg-white/90 shadow-sm hover:bg-white"
                    aria-label="Design options"
                  >
                    <HiOutlineDotsVertical className="size-5 text-primary" />
                  </button>

                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content z-20 mt-2 w-44 rounded-xl bg-white p-2 shadow-cardShadow border border-gray-100"
                  >
                    <li>
                      <button
                        onClick={() => {
                          onEdit(review);
                          document.activeElement?.blur();
                        }}
                        className="flex items-center gap-2 py-2.5 text-textPrimary"
                      >
                        <FiEdit2 className="size-4" />
                        Edit Review
                      </button>
                    </li>

                    <li>
                      <button
                        type="button"
                        aria-label="Review options"
                        onClick={() => {
                          handleDeleteConfirm(review._id);
                          document.activeElement?.blur();
                        }}
                        className="flex items-center gap-2 py-2.5 text-red-600"
                      >
                        <FiTrash2 className="size-4" />
                        Delete Review
                      </button>
                    </li>
                  </ul>
                </div>
              )}
              <img
                src={review.user?.image || "/usernotfound.jpg"}
                alt={review.user?.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex flex-col gap-2">
                <p className="text-sm leading-6 tracking-tight text-textSecondary">
                  &quot;{review.review}&quot;
                </p>
                <RatingStars value={review.rating} />
                <span>
                  <p className="font-semibold text-textPrimary">{review.user?.name}</p>
                  <p className="text-sm tracking-tighter text-textSecondary">
                    {review.user?.address}
                  </p>
                </span>
              </div>
            </div>
          )
        })}
        <ConfirmModal
          isOpen={showModal}
          title="Confirm Delete"
          message="Are you sure you want to delete this review?"
          confirmText="Delete"
          variant="danger"
          onConfirm={handleDeleteConfirmed}
          onCancel={handleDeleteCancel}
        />
      </div>

      {visible < reviews.length && (
        <button
          onClick={() => setVisible((v) => v + PAGE_SIZE)}
          className="mt-4 w-full rounded-full border border-borderLight py-2 text-sm font-semibold text-textPrimary hover:bg-gray-50"
        >
          Show more ({reviews.length - visible} left)
        </button>
      )}
    </section>
  );
}

export default ReviewsList;