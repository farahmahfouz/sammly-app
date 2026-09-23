import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Skelton from "../../layouts/Skelton";

export default function ProfileCard() {
  const { userProfile } = useContext(UserContext);

  if (!userProfile) {
    return <Skelton />;
  }

  return (
    <div className="relative flex flex-col items-center py-6">
      <img
        src="/lines.png"
        alt=""
        className="absolute -top-4 -start-10 rotate-[25deg] w-40 pointer-events-none select-none"
      />

      {userProfile.profilePicture ? (
        <img
          src={userProfile.profilePicture}
          alt="User Profile"
          className="relative z-10 w-64 h-64 rounded-full object-cover shadow-cardShadow"
        />
      ) : (
        <div className="relative z-10 w-64 h-64 rounded-full bg-surfacePurple shadow-cardShadow flex items-center justify-center">
          <span className="text-white text-7xl">
            {userProfile.name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      <img
        src="/lines.png"
        alt=""
        className="absolute -bottom-4 -end-8 w-40 rotate-180 pointer-events-none select-none"
      />
    </div>
  );
}