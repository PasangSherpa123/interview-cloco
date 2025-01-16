const { body, validationResult } = require("express-validator");
const validateArtistsArray = [
  body("artists")
    .isArray({ min: 1 })
    .withMessage("Artists must contain at least one artist")
    .custom((value) => {
      console.log(value);
      value.forEach((artist, index) => {
        if (!artist.name || typeof artist.name !== "string") {
          throw new Error(
            `Artist at index ${index} does not have a valid name.`
          );
        }
        if (!artist.gender || typeof artist.gender !== "string") {
          throw new Error(
            `Artist at index ${index} does not have a valid gender.`
          );
        }
        if (!artist.address || typeof artist.address !== "string") {
          throw new Error(
            `Artist at index ${index} does not have a valid address.`
          );
        }
        if (!artist.dob || typeof artist.dob !== "string") {
          throw new Error(
            `Artist at index ${index} does not have a valid address.`
          );
        }
      });
      return true;
    }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateArtistsArray };
