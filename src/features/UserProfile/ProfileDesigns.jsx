import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import Skelton from "../../layouts/Skelton";
import XIcon from "../../icons/XIcon";
import Empty from "./Empty";
import Card from "../../components/Card";
import ConfirmModal from "../../components/ConfirmModal";

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
    <div className="flex justify-center">
      {designs.length === 0 ? (
        <div className="w-full flex justify-center items-center py-10">
          <Empty resourceName="Designs" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {designs.map((design) => (
            <Card
              key={design._id}
              image={design.image[0]}
              title={design.name}
              price={`EGP ${design.totalPrice}`}
              description={design.description}
              imageClassName="h-[340px]"
              cornerAction={{
                icon: <XIcon />,
                onClick: () => handleDeleteConfirm(design._id),
              }}
              footer={
                <Link
                  to={`/designer/${design.productId}?edit=${design._id}`}
                  className="py-1.5 px-3 w-full rounded-full text-primary border border-primary tracking-tighter flex justify-center items-center gap-1.5"
                >
                  Edit
                </Link>
              }
            />
          ))}
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