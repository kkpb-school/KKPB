import { v2 as cloudinary } from 'cloudinary';

export const DeleteImage = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};
