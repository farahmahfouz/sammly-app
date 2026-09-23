import ProfileCard from "../features/UserProfile/ProfileCard";
import ProfileInformation from "../features/UserProfile/ProfileInformation";
import UserTabs from "../features/UserProfile/UserTabs";
import useUser from "../features/UserProfile/useUser";

const UserProfile = () => {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Error fetching user data: {error.message}</span>
      </div>
    );
  }

  const { userProfile, userOrders, favoriteProducts, designs } = user;

  return (
    <div className="container mx-auto py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-surfacePurple/30 rounded-lg shadow-cardShadow p-6">
          {/* Profile Card */}
          <div className="col-span-1">
            <ProfileCard />
          </div>

          {/* User Details Card */}
          <div className="col-span-2">
            <ProfileInformation />
          </div>
        </div>
        <UserTabs
          userProfile={userProfile}
          userOrders={userOrders}
          favoriteProducts={favoriteProducts}
          designs={designs}
        />
    </div>
  );
};

export default UserProfile;