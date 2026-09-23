import { useState } from "react";
import PropTypes from "prop-types";
import ProfileDesigns from "./ProfileDesigns";
import ProfileFav from "./ProfileFav";
import ProfileOrders from "./ProfileOrders";
import { GiBeveledStar } from "react-icons/gi";
import { MdDesignServices } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";

export default function UserTabs({ userOrders, favoriteProducts, designs }) {
  const [activeTab, setActiveTab] = useState("favorites");

  const tabs = [
    { key: "favorites", label: "Favorites", icon: <GiBeveledStar /> },
    { key: "designs", label: "Designs", icon: <MdDesignServices /> },
    { key: "orders", label: "Orders", icon: <FaShoppingBag /> },
  ];

  return (
    <div>
      <div className="flex text-textSecondary pt-10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 w-32 justify-center font-medium transition-colors
              ${
                activeTab === tab.key
                  ? "border bg-primaryGradient text-white rounded-full shadow-cardShadow"
                  : "text-textSedondary"
              }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="rounded-box py-6">
        {activeTab === "favorites" && (
          <ProfileFav favoriteProducts={favoriteProducts} />
        )}
        {activeTab === "designs" && <ProfileDesigns designs={designs} />}
        {activeTab === "orders" && <ProfileOrders userOrders={userOrders} />}
      </div>
    </div>
  );
}

UserTabs.propTypes = {
  userOrders: PropTypes.array,
  favoriteProducts: PropTypes.array,
  designs: PropTypes.array,
};