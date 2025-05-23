// utils/slugify.js  (or define it inside the component)
export const slugify = (str) =>
  str
    .toString()
    .trim()
    .toLowerCase()
    // replace accented chars (é → e, ñ → n, …)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // anything not a-z, 0-9, or space → replace with a space
    .replace(/[^a-z0-9\s-]/g, " ")
    // collapse consecutive spaces & dashes
    .replace(/[\s-]+/g, " ")
    // replace spaces with dash
    .replace(/\s/g, "-");
