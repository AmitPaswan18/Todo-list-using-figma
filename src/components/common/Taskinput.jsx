function TaskInput(props) {
  const { value, name, className, children, size, ...rest } = props;

  const styles = {
    fontSize: size === "small" ? "10px" : "16px",
    padding: size === "small" ? "4px 8px" : "8px 16px",
    heigth: size === "small" ? "24px" : "32px",
    width: size === "100%",
  };

  return (
    <input
      type="text"
      className={className}
      value={value}
      required
      style={styles}
      {...rest}
    />
  );
}

export default TaskInput;
