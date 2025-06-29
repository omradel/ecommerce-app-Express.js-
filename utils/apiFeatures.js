import agregation from "../utils/agregation.js";

class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const array = ["page", "per_page", "sort", "fields", "keyword"];
    let filterObj = { ...this.queryString };
    array.forEach((el) => delete filterObj[el]);
    filterObj = agregation(filterObj);
    this.query = this.query.find(filterObj);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  selectFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  search() {
    if (this.queryString.keyword) {
      const keyword = this.queryString.keyword;
      let searchQuery = {};
      searchQuery.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
      this.query = this.query.find(searchQuery);
    }
    return this;
  }

  paginate(perPage) {
    const page = this.queryString.page * 1 || 1;
    const skip = (page - 1) * perPage;
    this.query = this.query.limit(perPage).skip(skip);
    return this;
  }
}

export default ApiFeatures;
