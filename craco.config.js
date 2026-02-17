const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@modules": path.resolve(__dirname, "src/libs/modules"),
      "@presentation": path.resolve(__dirname, "src/libs/presentation"),
      "@libs/shared": path.resolve(__dirname, "src/libs/shared"),
    },
  },
};
