const BASE_URL = "http://localhost:5000/api"; // or your production URL

export const LOGIN = `${BASE_URL}/auth/login`;
export const REGISTER = `${BASE_URL}/auth/register`;

const BLOG_BASE_URL = `${BASE_URL}/blogs`;
const CATEGORIES_BASE_URL = `${BASE_URL}/categories`;
const USER_BASE_URL = `${BASE_URL}/users`;

const apiRoutes = {
  users: {
    add: `${USER_BASE_URL}/addUser`,
    update: (id) => `${USER_BASE_URL}/${id}`,
    delete: (id) => `${USER_BASE_URL}/${id}`,
    getAll: `${USER_BASE_URL}/getUser`,
  },

  categories: {
    add: `${CATEGORIES_BASE_URL}/addCategory`,
    update: (id) => `${CATEGORIES_BASE_URL}/${id}`,
    delete: (id) => `${CATEGORIES_BASE_URL}/${id}`,
    getAll: `${CATEGORIES_BASE_URL}/getCategory`,
  },

  blogs: {
    add: `${BLOG_BASE_URL}/addBlog`,
    update: (id) => `${BLOG_BASE_URL}/${id}`,
    delete: (id) => `${BLOG_BASE_URL}/${id}`,
    getAll: `${BLOG_BASE_URL}/getBlog`,
  },

  // Add more routes here as needed
};

export default apiRoutes;
