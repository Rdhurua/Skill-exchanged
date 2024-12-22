const jwt=require("jsonwebtoken");
module.exports=async function(req,res){
    const token = req.cookies.token; // Extract the token from the HttpOnly cookie

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SALT_KEY); // Validate the token
    return res.status(200).json({ message: "Valid session", exp: decoded.exp });
   
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }

}