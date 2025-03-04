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
    min-w-40
    max-w-56"
      style={{
        backgroundColor: error ? "#ff0000" : "#00ff00",
      }}
    >
      {message}
    </div>
  );
}

export default PopUpHelper;
