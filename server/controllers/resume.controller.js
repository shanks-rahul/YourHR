import asyncHandler from "../middlewares/asyncHandler.js";
import Resume from "../model/resume.model.js";
import AppErr from "../utils/AppError.js";

export const createResume = asyncHandler(async (req, res, next) => {
  try {
    const { fullname, email, number } = req.body;
    const resumePdf = req.file.filename;
    console.log(resumePdf);
    if (!fullname || !email || !number || !resumePdf) {
      return next(new AppErr("All Fields are required", 400));
    }
    const resume = await Resume.create({
      fullname,
      email,
      number,
      resumePdf
    })
    await resume.save();
    if (!resume) {
      return next(new AppErr("Unable to upload your application", 400));
    }
    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume
    })
  } catch (error) {
    console.log(error);
    return next(new AppErr(error, 400));
  }
});
export const getAllResume = asyncHandler(async (_req, res, next) => {
  const resumes = await Resume.find({});
  res.status(200).json({
    success: true,
    message: "All resumes",
    resumes
  })
})
