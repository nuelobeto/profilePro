const { checkRecordExists, updateRecord } = require("../utils/sqlFunctions");
const cloudinary = require("../utils/cloudinary");

const updateProfile = async (req, res) => {
  try {
    const profile = await checkRecordExists(
      "profiles",
      "userId",
      req.user.userId
    );

    const updates = {
      ...req.body,
    };

    if (req.file) {
      if (!profile.image) {
        const image = await cloudinary.uploader.upload(req.file.path, {
          folder: "profilePro",
        });
        updates.image = image.secure_url;
      } else {
        const image_url = profile.image.split("/");
        const publicId = image_url[image_url.length - 1].split(".")[0];
        await cloudinary.uploader.destroy(`profilePro/${publicId}`);

        const image = await cloudinary.uploader.upload(req.file.path, {
          folder: "profilePro",
        });
        updates.image = image.secure_url;
      }
    }

    await updateRecord("profiles", updates, "profileId", profile.profileId);
    res.json({ message: "Profile Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateProfile,
};
