import { axiosInstance } from "../api/axios.config";

const convertBase64 = (imageFile) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const uploadImage = async (imageFile) => {
  const base64 = await convertBase64(imageFile);

  var url;
  await axiosInstance
    .post("services/uploadImage", { image: base64 })
    .then((res) => {
      url = res;
    })
    .catch(console.log);
  return { url };
};

export { uploadImage };
