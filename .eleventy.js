const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./posts/*.md").reverse();
  });

  eleventyConfig.addFilter("date", (dateObj, format = "MMMM d, yyyy") => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });
{
  eleventyConfig.addPassthroughCopy("styles.css"); // ✅ REQUIRED
  eleventyConfig.addPassthroughCopy("images");
};

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};
