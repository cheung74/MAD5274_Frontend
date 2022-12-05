import {
    uploadBytesResumable,
    getStorage,
    ref,
    getDownloadURL,
    uploadBytes
} from "@firebase/storage";
import app from "../firebaseConfig";
import uuid from "uuid";

export const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blobFile = await response.blob();
      const fileRef = ref(getStorage(app), uuid.v4());
      await uploadBytes(fileRef, blobFile);
      return await getDownloadURL(fileRef);
    } catch (e) {
      console.error(`Error in updateImage-${uri}`, e);
    }
};