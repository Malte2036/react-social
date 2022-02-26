import { useEffect, useState } from "react";
import BackendService from "../lib/database/backendService";
import { MyFile } from "../lib/database/data/myFile";
import { useCookies } from "react-cookie";

export default function PostViewImage(props: {
  backendService: BackendService;
  imageId: number | null;
}) {
  const [cookie] = useCookies(["bearerToken"]);
  const [image, setImage] = useState<MyFile | null | undefined>(
    props.imageId === null ? null : undefined
  );
  useEffect(() => {
    props.backendService
      .getFileById(props.imageId!, cookie.bearerToken)
      .then((myFile) => setImage(myFile));
  }, []);
  return (
    <img
      className="w-full mt-3 rounded-lg border-1 border-gray-200 dark:border-gray-900"
      src={image?.data}
      alt=""
    />
  );
}
