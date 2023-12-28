const RadioButton = (props) => {
  const {
    value,
    name,
    className,
    children,
    size,
    onChange,
    label,
    checked,
    ...rest
  } = props;

  const styles = {
    fontSize: size === "small" ? "10px" : "16px",
    padding: size === "small" ? "4px 8px" : "8px 16px",
    heigth: size === "small" ? "24px" : "32px",
    width: size === "100%",
    color: null,
  };
  return (
    <>
      <div>
        <input
          type="radio"
          id={value}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={value}>{label}</label>
      </div>
    </>
  );
};

export default RadioButton;
