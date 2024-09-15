const authrised = (permittedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.roll;

    // console.log("authriz", userRole);

    if (permittedRoles.includes(userRole)) {
      next();
    } else {
      return res.status(401).json({ message: "you are not authorized" });
    }
  };
};

module.exports = {
  authrised,
};
