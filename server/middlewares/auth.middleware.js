import jwt from 'jsonwebtoken';
import AppErr from "../utils/AppError.js";
import asyncHandler from "./asyncHandler.js";

export const isLoggedIn = asyncHandler(async (req, _res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return next(new AppErr("User is not authenticated", 400));
    }
    const decoded = await jwt.verify(token, process.env.SECRET);
    if (!decoded) {
        return next(new AppErr("Unauthorized, please login to continue", 403));
    }
    req.user = decoded;
    next();
});
export const authorizedRoles = (...roles) =>
    asyncHandler(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppErr("You are not allowed to access this route", 403))
        }
        next();
    });