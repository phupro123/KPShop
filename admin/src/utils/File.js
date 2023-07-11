const getImageURLFromFile = (file) => {
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }

  return file.url;
};

export { getImageURLFromFile };
