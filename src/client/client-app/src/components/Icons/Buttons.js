function Button(props) {
  let typeBtn = "submit";
  if (props.type) {
    typeBtn = props.type;
  }

  return (
    <button
      type={typeBtn}
      onClick={props.onClick}
      className="px-4 py-2 my-2 text-base font-medium text-white transition duration-500 ease-in-out transform bg-green-600 border-green-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-green-800"
    >
      {" "}
      {props.text}{" "}
    </button>
  );
}

export default Button;
