// this function transforms an object with keys in the format "field[operator]" into a nested object structure
// where the field is the key and the operator is a sub-key with a value
// ex : { price[gte]: 100, price[lte]: 500 } => { price: { $gte: 100, $lte: 500 } }
const agregation = (filterObj) => {
  Object.keys(filterObj).forEach((key) => {
    if (key.includes("[")) {
      const [field, operator] = key.split(/\[|\]/).filter(Boolean);
      if (!filterObj[field]) filterObj[field] = {};
      filterObj[field][`$${operator}`] = Number(filterObj[key]);
      delete filterObj[key];
    }
  });

  return filterObj;
};

export default agregation;
