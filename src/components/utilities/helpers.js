export const generateId = () => {
  const characters = "abcdefgh0123456789";
  const length = 24;
  let id = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
};

export const getCurrentQuarter = () => {
  const month = new Date().getMonth();
  let quarter;

  if (month >= 0 && month <= 2) {
    quarter = 1;
  } else if (month >= 3 && month <= 5) {
    quarter = 2;
  } else if (month >= 6 && month <= 8) {
    quarter = 3;
  } else {
    quarter = 4;
  }

  return quarter;
};

export const validateObjectData = (data) => {
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] === null || data[key] === undefined || data[key] === "") {
        return true; // Object has an empty value
      }
    }
  }
  return false; // No empty values found
};

export const rearrangelists = (name) => {
  switch (name) {
    case "Problem":
      return 1;
    case "Existing Alternatives":
      return 2;
    case "Solution":
      return 3;
    case "Key Metrics":
      return 4;
    case "Unique Value Proposition":
      return 5;
    case "High-Level Concept":
      return 6;
    case "Unfair Advantage":
      return 7;
    case "Channels":
      return 8;
    case "Customer Segments":
      return 9;
    case "Early Adopters":
      return 10;
    case "Cost Structure":
      return 11;
    case "Revenue Streams":
      return 12;
    default:
      break;
  }
};

export const setPlaceholderTxt = (name) => {
  switch (name) {
    case "Problem":
      return "Your customer's problems";
    case "Existing Alternatives":
      return "How your customer's problems are solved today";
    case "Solution":
      return "Outline possible solutions";
    case "Key Metrics":
      return "List key numbers showing how your business is doing";
    case "Unique Value Proposition":
      return "Compelling message that gets you customers";
    case "High-Level Concept":
      return "Statement that explains your business idea in a few words";
    case "Unfair Advantage":
      return "Something about your product that can not be copied";
    case "Channels":
      return "Your path to customers";
    case "Customer Segments":
      return "Your customer categories";
    case "Early Adopters":
      return "Characteristics of your ideal customers";
    case "Cost Structure":
      return "Fixed and variable costs";
    case "Revenue Streams":
      return "Sources of revenue";
    default:
      break;
  }
};

export const incrementValue = (value) => {
  return value + 1;
};

export const getLastElement = (array) => {
  if (array.length === 0) {
    return undefined; // Return undefined for an empty array
  }
  return array[array.length - 1];
};

export const getRandomColor = () => {
  // Generate random values for the red, green, and blue components
  const red = Math.floor(Math.random() * 256); // 0 to 255
  const green = Math.floor(Math.random() * 256); // 0 to 255
  const blue = Math.floor(Math.random() * 256); // 0 to 255

  // Convert the RGB values to a hexadecimal color code
  const colorCode = `#${red.toString(16)}${green.toString(16)}${blue.toString(
    16
  )}`;

  return colorCode;
};
