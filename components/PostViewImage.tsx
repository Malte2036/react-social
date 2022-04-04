import { useContext, useEffect, useState } from "react";
import { MyFile } from "../lib/database/data/myFile";
import { useCookies } from "react-cookie";
import { BackendServiceContext } from "../lib/contexts/BackendServiceContext";

export default function PostViewImage(props: { imageId: string | null }) {
  const [cookie] = useCookies(["bearerToken"]);
  const backendService = useContext(BackendServiceContext);

  const [image, setImage] = useState<MyFile | null | undefined>(
    props.imageId === null ? null : undefined
  );
  useEffect(() => {
    backendService
      .getFileById(props.imageId!, cookie.bearerToken)
      .then((myFile) => setImage(myFile));
  }, [cookie.bearerToken, backendService, props.imageId]);
  return (
    <img
      className="w-full mt-3 rounded-lg border-1 border-gray-200 dark:border-gray-900"
      src={image?.data}
      alt=""
    />
  );
}
