import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const CustomSelectInput = ({ id, value, handleChange, menuItems }) => {
  return (
    <div>
      <Select
        id={id}
        value={value}
        onChange={handleChange}
        variant="standard"
        style={{ width: "100%" }}
        name={id}
      >
        {menuItems.map((item, index) => {
          return (
            <MenuItem value={item.value} key={index}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default CustomSelectInput;
