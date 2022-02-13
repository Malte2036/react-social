import { useEffect, useState } from "react";
import BackendService from "../database/backendService";
import { MyFile } from "../database/data/myFile";

export default function ProfilePicture(props: {
  backendService: BackendService;
  imageId: number | null;
}) {
  const [image, setImage] = useState<MyFile | null | undefined>(
    props.imageId === null ? null : undefined
  );
  useEffect(() => {
    if (image === undefined) {
      props.backendService
        .getFileById(props.imageId!)
        .then((myFile) => setImage(myFile));
    }
  }, [image, props.backendService, props.imageId]);
  return (
    <img
      className="h-8 w-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-900"
      src={image?.data}
      alt=""
    />
  );
}
