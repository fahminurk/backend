const verify = (req, res, next) => {
  const key = process.env["secret-key"];
  const secret = req.headers["x-secret-key"];
  if (secret != key) {
    return res.send("invalid key");
  }
  next();
};

module.exports = verify;
