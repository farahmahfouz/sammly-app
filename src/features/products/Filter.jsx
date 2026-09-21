// eslint-disable-next-line react/prop-types
function Filter({ isOpen }) {
  return (
    <div
      className={`border-r border-0 border-borderLight h-full overflow-hidden transition-all duration-300 ${
        isOpen ? "w-80" : "w-0 border-0"
      }`}
    >
      <div className="w-80 p-4">Filter</div>
    </div>
  );
}

export default Filter;