import { FiCloud, FiWind, FiUsers, FiRotateCcw } from "react-icons/fi";

const features = [
  {
    title: "100% Cotton",
    icon: FiCloud,
  },
  {
    title: "Breathable Fabric",
    icon: FiWind,
  },
  {
    title: "Unisex Fit",
    icon: FiUsers,
  },
  {
    title: "Easy Returns",
    icon: FiRotateCcw,
  },
];

function ProductFeatures() {
  return (
    <section className="w-full rounded-md bg-surfaceLavender/60 px-4 py-2 ">
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
        {features.map(({ title, icon: Icon }) => (
          <div
            key={title}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primaryLight">
              <Icon
                className="text-primary"
                size={18}
                strokeWidth={2}
              />
            </div>

            <span className="text-xs font-bold text-textSecondary">
              {title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductFeatures;