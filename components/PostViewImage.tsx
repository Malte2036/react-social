import { useEffect, useState } from "react";
import BackendService from "../database/backendService";
import { MyFile } from "../database/data/myFile";

export default function PostViewImage(props: {
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
  });
  return (
    <img
      className="w-full mt-3 rounded-lg border-1 border-gray-200 dark:border-gray-900"
      src={image?.data}
      alt=""
    />
  );
}
