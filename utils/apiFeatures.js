class ApiFeatures {
  constructor({ mongooseQuery, queryString }) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  Filter() {
    const queryStringObj = { ...this.queryString };
    const excludeFields = [
      "page",
      "sort",
      "limit",
      "fields",
      "search",
      "pages",
    ];
    excludeFields.forEach((field) => delete queryStringObj[field]);
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    return this;
  }

  Sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  LimitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  Search() {
    if (this.queryString.search) {
      const query = {};
      query.$or = [
        { title: { $regex: this.queryString.search, $options: "i" } },
        { description: { $regex: this.queryString.search, $options: "i" } },
      ];
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }

  Pagination({ numberOfDocs }) {
    const pages = this.queryString.pages * 1 || 1;
    const limit = this.queryString.limit * 1 || 50;
    const skip = (pages - 1) * limit;

    const pagination = {};
    pagination.currentPage = pages;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(numberOfDocs / limit);

    if (skip > 0) {
      pagination.previousPage = pages - 1;
    }
    if (pagination.numberOfPages > pages) {
      pagination.nextPage = pages + 1;
    }
    this.pagination = pagination;
    this.mongooseQuery = this.mongooseQuery.limit(limit).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
