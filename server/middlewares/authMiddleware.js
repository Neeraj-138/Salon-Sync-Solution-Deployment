import jwt from "jsonwebtoken";

const isAuthenticate = (req, res, next) => {
    const token =req.cookies.token;
    // console.log("token-cookies", req.cookies.token);

    if (!token) {
      // console.log("not Token")
        return res.json({
        Status: false,
        message: "Token is not provided in the request body",
        });
    }

  try {
    const decode = jwt.verify(token, "jwt_secret_key");
    // console.log("user Information", decode);
    req.user = decode;
    next();
  } catch (error) {
    console.log("catch Error",error)
    return res.json({ Status: false, message: "Token is invalid" });
  }
};

const isCustomer = (req, res, next) => {
    console.log("is Customer", req.user.Roll);

    try {
    if (req.user.Roll !=="Customer") {
      return res.json({
        Status: false,
        message: "protected routes for this role ",
      });
    }
    console.log("Customer next")
    next();
  } catch (error) {
    return res.json({ Status: false, message: "User roll is not matching" });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (req.user.roll !== "Admin") {
      return res.json({
        Status: false,
        message: "protected routes for this role ",
      });
    }
    next();
  } catch (error) {
    return res.json({ Status: false, message: "User roll is not matching" });
  }
};

export { isAdmin, isCustomer, isAuthenticate };

