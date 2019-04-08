exports.isUserLogin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({
      error: { type: "USER_UNAUTHORIZED", message: "You must login!" }
    });
  } else {
    next();
  }
};

exports.isAdmin = async (req, res, next) => {
  if (req.user.role_id > 1) {
    return res.status(401).send({
      error: { type: "USER_UNAUTHORIZED", message: "You are not admin!" }
    });
  } else {
    next();
  }
};
