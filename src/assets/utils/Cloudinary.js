const preset_name = "adoptme_unsigned";
const cloud_name = "dmxikj53v";

export const uploadImage = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', preset_name);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
            {
                method: 'POST',
                body: data
            }
        );

        const res = await response.json();
        return res.secure_url;

    } catch (error) {
        console.error(error);
    }
};