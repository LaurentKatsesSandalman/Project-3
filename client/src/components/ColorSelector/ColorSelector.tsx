const predefinedColors = [
  '#db4437', '#673ab7', '#3f5165', '#4285f4', '#03a9f4',
  '#00bcd4', '#ff5722', '#ff9800', '#009688', '#4caf50',
  '#607d8b', '#9e9e9e'
];

const ColorSelector = ({ color, setColor }) => {
  return (
    <div className="color-selector">
      <label htmlFor="color-select">Choisir une couleur : </label>
      <select
        id="color-select"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="color-dropdown"
      >
        {predefinedColors.map((colorOption) => (
          <option key={colorOption} value={colorOption}>
            {colorOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ColorSelector;
