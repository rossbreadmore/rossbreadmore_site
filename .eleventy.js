const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./posts/*.md").reverse();
  });

  eleventyConfig.addFilter("date", (dateObj, format = "MMMM d, yyyy") => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("illustrations");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.ignores.add("portfolio/content.html"); // source is encrypted into _data/portfolio.json — never publish it raw
  eleventyConfig.ignores.add("portfolio/assets/**"); // source images, baked into the encrypted blob at lock time — never publish raw
  eleventyConfig.addPassthroughCopy("standalone");
  eleventyConfig.ignores.add("standalone/**");
  eleventyConfig.addPassthroughCopy("acupuncture");
  eleventyConfig.ignores.add("acupuncture/**");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",       // ✅ this is implied but included for clarity
      output: "_site"
    }
  };
};
