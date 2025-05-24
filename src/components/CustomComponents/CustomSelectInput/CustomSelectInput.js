import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const CustomSelectInput = ({
  id,
  value,
  handleChange,
  menuItems,
  style,
  disabled = false,
}) => {
  return (
    <Select
      id={id}
      value={value ?? ""}
      onChange={handleChange}
      variant="standard"
      style={{ width: "100%", ...style }}
      name={id}
      disabled={disabled}
    >
      {menuItems.map((item) => {
        return (
          <MenuItem value={item.value} key={item.label}>
            {item.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default CustomSelectInput;
