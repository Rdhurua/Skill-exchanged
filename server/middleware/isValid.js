import jwt from "jsonwebtoken";


export default async function(req,res){
    const token = await req.cookies.token; 
    
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SALT_KEY); 
    return res.status(200).json({ message: "Valid session", exp: decoded.exp });
   
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }

}