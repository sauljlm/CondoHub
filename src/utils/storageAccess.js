import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";

class StorageAccess {
  constructor() {
    this.storage = getStorage();
    this.bucketName = "gs://condoplus-6ad1a.appspot.com";
  }

  // upload a file to the storage and return the url
  async uploadFile(file, path) {
    const storageRef = ref(this.storage, `${this.bucketName}/${path}`);
    const uploadTask = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(uploadTask.ref);
    return url;
  }
}

export default StorageAccess;
