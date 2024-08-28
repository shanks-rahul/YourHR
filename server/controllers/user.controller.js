import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../model/user.model.js";
import AppErr from "../utils/AppError.js";
const cookieOptions = {
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
}
export const register = asyncHandler(async (req, res, next) => {
    const { fullName, email, password } = req.body;
    if(!fullName || !email || !password){
        return next(new AppErr("All Fields are required", 400));
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        return next(new AppErr("email already exists", 400));
    }
    const user = await User.create({
        fullName,
        email,
        password,
    })
    if (!user) {
        return next(new AppErr("user registration failed", 400));
    }

    await user.save();

    const token = await user.generateJWTtoken();
    user.password = undefined;
    res.cookie('token', token, cookieOptions);
    res.status(200).json({
        success: true,
        message: "user registered successfully",
        user
    })

});
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppErr("All Fields are required", 400));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!(user && (await user.comparePassword(password)))) {
        return next(new AppErr("user does not exist or password does not match", 400));
    }
    const token = await user.generateJWTtoken();
    user.password = undefined;
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
        success: true,
        message: "user logged in successfully",
        user
    })
});
export const logout = asyncHandler(async (req, res, next) => {
    res.cookie("token", null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "user logged out successfully",
    })
});
export const getLoggedInUserDetails = asyncHandler(async (req, res, next) => {
    const user=await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        message:"user details",
        user
    })
})