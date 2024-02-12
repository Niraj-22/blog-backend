const validateExtension = (extension) => {
  if (
    extension === ".jpg" ||
    extension === ".jpeg" ||
    extension === ".png" ||
    extension === ".pdf"
  ) {
    return true;
  } else {
    return false;
  }
};

module.exports = { validateExtension };
