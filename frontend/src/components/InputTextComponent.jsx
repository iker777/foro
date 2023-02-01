const InputTextComponent = ({ placeholder, name, type, handleOnChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={(e) => handleOnChange(e)}
      name={name}
      className="w-full m-2 p-2 border-0 rounded bg-white bg-opacity-50 text-black placeholder:italic placeholder:text-slate-700 text-sm outline-0"
    />
  );
};

export default InputTextComponent;
