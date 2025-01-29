import { verifyToken } from "../services/authService.js"; 

export default (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(400).json({ success: false, message: "Invalid token." });
  }
  req.user = decoded; 
  next(); 
};
