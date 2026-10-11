import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import Skelton from "../../layouts/Skelton";
import Empty from "./Empty";
import ConfirmModal from "../../components/ConfirmModal";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function ProfileDesigns() {
  const [showModal, setShowModal] = useState(false);
  const [designToDelete, setDesignToDelete] = useState(null);

  const { designs, removeDesign } = useContext(UserContext);

  const handleDeleteConfirm = (id) => {
    setDesignToDelete(id);
    setShowModal(true);
  };

  const handleDeleteCancel = () => {
    setDesignToDelete(null);
    setShowModal(false);
  };

  const handleDeleteConfirmed = () => {
    if (designToDelete) {
      removeDesign(designToDelete);
    }

    setDesignToDelete(null);
    setShowModal(false);
  };

  if (!designs) {
    return <Skelton />;
  }

  return (
    <div className="w-full">
      {designs.length === 0 ? (
        <div className="flex w-full items-center justify-center py-10">
          <Empty resourceName="Designs" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {designs.map((design) => {
            return (

              <div key={design._id} className="relative">
                <img
                  src={design.image[0]}
                  alt={design.name || "My design"}
                  className="w-full h-[280px] object-contain rounded-2xl shadow-cardShadow"
                />

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
                      <Link
                        to={`/designer/${design.productId}?edit=${design._id}`}
                        className="flex items-center gap-2 py-2.5 text-textPrimary"
                      >
                        <FiEdit2 className="size-4" />
                        Edit Design
                      </Link>
                    </li>

                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          handleDeleteConfirm(design._id);
                          document.activeElement?.blur();
                        }}
                        className="flex items-center gap-2 py-2.5 text-red-600"
                      >
                        <FiTrash2 className="size-4" />
                        Delete Design
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

            )
          })}
        </div>
      )}

      <ConfirmModal
        isOpen={showModal}
        title="Confirm Delete"
        message="Are you sure you want to delete this design?"
        confirmText="Delete"
        variant="danger"
        onConfirm={handleDeleteConfirmed}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}