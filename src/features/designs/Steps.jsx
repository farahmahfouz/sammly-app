import { FiImage, FiType, FiShoppingCart } from "react-icons/fi";

function Steps() {
  const steps = [
    {
      icon: FiImage,
      title: "Pick Image",
      desc: "Add your story",
      bg: "bg-indigo-50",
      color: "text-indigo-400",
    },
    {
      icon: FiType,
      title: "Add Text",
      desc: "Personalize it",
      bg: "bg-blue-50",
      color: "text-blue-400",
    },
    {
      icon: FiShoppingCart,
      title: "Add to Cart",
      desc: "Get your custom t-shirt",
      bg: "bg-purple-50",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="flex items-center justify-between w-full max-w-lg">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center flex-1">
          <div className="flex flex-col items-center text-center flex-1">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center ${step.bg}`}
            >
              <step.icon className={`w-6 h-6 ${step.color}`} />
            </div>
            <p className="mt-2 text-sm font-bold text-slate-800">{step.title}</p>
            <p className="text-xs text-slate-400">{step.desc}</p>
          </div>

          {i < steps.length - 1 && (
            <div className="flex-1 border-t-2 border-dotted border-indigo-200 mx-1 mb-8"></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Steps;