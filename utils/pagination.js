class Pagination {
  constructor(total, page, per_page, total_pages) {
    this.total = total;
    this.page = page;
    this.per_page = per_page;
    this.total_pages = total_pages;
  }
}

export default Pagination;
