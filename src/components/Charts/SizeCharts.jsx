import { PiResizeBold } from "react-icons/pi";

export default function SizeCharts() {
  return (
    <div className="py-4 px-12 bg-surfacePurple/20 border text-textPrimary border-surfacePurple shadow-cardShadow rounded-md">
      <div className="">
        <div className="flex gap-1 items-center text-primary text-sm font-semibold capitalize tracking-tighter">
          <PiResizeBold />
          <p>size chart</p>
        </div>
        <p className="text-sm text-textMuted first-letter:uppercase tracking-tighter">choose your size carefully to get the perfict fit</p>
      </div>
      <div className="grid grid-cols-[2fr_4fr]">
        <img src="/size-chart.png" alt="" className="w-full object-cover" />
        <div className="rounded-xl border border-borderLight overflow-hidden">
          <table className="border-collapse w-full">
            <thead>
              <tr className="bg-gray-100 ">
                <th className="px-4 py-2 border text-textPrimary border-borderLight">Size</th>
                <th className="px-4 py-2 border text-textPrimary border-borderLight">Chest-cms</th>
                <th className="px-4 py-2 border text-textPrimary border-borderLight">Waist-cms</th>
                <th className="px-4 py-2 border text-textPrimary border-borderLight">Hips-cms</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="px-4 py-2 border text-textPrimary border-borderLight font-bold">XS</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">87-92</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">71-76</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">&lt; 92</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border text-textPrimary border-borderLight font-bold">S</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">92-97</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">76-81</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">92-97</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border text-textPrimary border-borderLight font-bold">M</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">97-102</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">81-86</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">97-102</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border text-textPrimary border-borderLight font-bold">L</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">102-107</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">86-91</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">102-107</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border text-textPrimary border-borderLight font-bold">XL</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">107-112</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">91-96</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">107-112</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border text-textPrimary border-borderLight font-bold">XXL</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">112-117</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">96-101</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">112-117</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border text-textPrimary border-borderLight font-bold">3XL</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">117-122</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">101-106</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">117-122</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border text-textPrimary border-borderLight font-bold">4XL</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">122-127</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">106-111</td>
                <td className="px-4 py-2 border text-textMuted border-borderLight">&gt; 122</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}
