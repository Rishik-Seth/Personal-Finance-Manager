import userService from "../services/userService.js";

export const registerUser = async (req, res, next) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const token = await userService.login(req.body);

    if (!token) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};
