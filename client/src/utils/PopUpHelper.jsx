function PopUpHelper({ message = "This is a popup message", error = true }) {
  return (
    <div
      className="
    fixed
    top-[15%]
    left-0
    right-0
    mx-auto
    border-y-2
    text-white
    flex
    items-center
    justify-center
    w-fit
    px-10
    py-0.5"
      style={{
        backgroundColor: error ? "#ff3c3c" : "#27b34d",
      }}
    >
      {message}
    </div>
  );
}

export default PopUpHelper;
