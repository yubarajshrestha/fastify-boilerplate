import FileManager from "@/helpers/filemanager.helper";
import transaction from "@/helpers/transaction.helper";
import { ApiMiddleware } from "@/middlewares/api.middleware";
import { User, UserProfile } from "@/models";
import UserProfileValidator from "@/schemas/user-profile.validator";

// get logged in user's profile
const profile = async (request, reply) => {
  const user = request.user;
  return reply.send({
    user,
  });
};

// update logged in user's profile
const updateProfile = async (request, reply) => {
  await UserProfileValidator.body.validate(request.body, {
    strict: false,
    abortEarly: false,
    stripUnknown: true,
    recursive: true,
  });
  try {
    const file = request.file;
    const userData = request.body;
    const profileData = {
      bio: userData.bio,
      profile_picture_key: file ? file.key : request.user.profile_picture_key,
    };
    await transaction(async (t) => {
      await User.update(userData, {
        where: { id: request.user.id },
        transaction: t,
      });
      await UserProfile.update(profileData, {
        where: { user_id: request.user.id },
        transaction: t,
      });
    });
    return reply.send({
      message: "Profile updated successfully",
    });
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Failed to update profile", error: error.message });
  }
};

const Controller = (app, _, done) => {
  app.addHook("preHandler", ApiMiddleware);
  app.get("/", profile);
  app.post(
    "/",
    { preHandler: [FileManager.upload.single("profilePicture")] },
    updateProfile
  );
  done();
};

export default Controller;
