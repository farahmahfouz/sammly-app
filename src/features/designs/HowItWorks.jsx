import { TbArrowWaveRightDown } from "react-icons/tb";

const steps = [
  {
    number: 1,
    image: '/steps/select.png',
    title: "Choose",
    desc: "Start by selecting your favorite style and color.",
  },
  {
    number: 2,
    image: '/steps/upload.png',
    title: "Design",
    desc: "Use our intuitive design tools to personalize your T-shirt with text and images.",
  },
  {
    number: 3,
    image: '/steps/order.png',
    title: "Add to cart",
    desc: "Once your masterpiece is complete, add it to your cart.",
  },
];

export default function HowItWorks() {
  return (
    <div className="p-8 bg-surfaceLavender container mx-auto rounded-md">
      <div className="mb-5 flex items-center justify-center gap-4">
        <span className="h-[1px] w-12 sm:w-16 bg-primaryDark"></span>
        <p className="font-bold text-lg sm:text-xl text-primaryDark tracking-wide uppercase">
          How it works
        </p>
        <span className="h-[1px] w-12 sm:w-16 bg-primaryDark"></span>
      </div>

      <div className="mb-10 text-lg sm:text-4xl font-bold max-w-3xl mx-auto text-textPrimary text-center">
        It’s that simple to create and shop your perfect T-shirt!
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        {steps.map((step, i) => (
          <div key={step.number} className="flex items-center">
            <div className="relative w-64 bg-base-100 rounded-xl shadow-cardShadow pt-8 pb-6 px-5 flex flex-col items-center">
              <span style={{
                background: "linear-gradient(to right, #81B3DC, #CE6ADA)"
              }} className="absolute -top-4 left-6 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm">
                {step.number}
              </span>

              <div className="w-28 h-20 rounded-full bg-surfaceLavender flex items-center justify-center mb-4">
                <img src={step.image} alt="" />
              </div>

              <h2 className="font-bold text-xl text-textPrimary mb-2">
                {step.title}
              </h2>
              <p className="text-sm text-textMuted text-center">
                {step.desc}
              </p>
            </div>

            {i < steps.length - 1 && (
              <TbArrowWaveRightDown className="hidden sm:block text-primary text-2xl mx-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}