import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BackendServiceContext } from "../lib/contexts/BackendServiceContext";
import { MyFile } from "../lib/database/data/myFile";
import defaultProfilePicture from "../public/default_profile_picture.png";

export default function ProfilePicture(props: {
  imageId: string | null;
  size?: number;
}) {
  const [cookie] = useCookies(["bearerToken"]);
  const backendService = useContext(BackendServiceContext);
  const [image, setImage] = useState<MyFile | null | undefined>(
    props.imageId === null ? null : undefined
  );
  useEffect(() => {
    if (props.imageId != null) {
      backendService
        .getFileById(props.imageId!, cookie.bearerToken)
        .then((myFile) => setImage(myFile));
    }
  }, [cookie.bearerToken, backendService, props.imageId]);

  return image !== undefined ? (
    <Image
      className="rounded-full object-cover border-2 border-gray-200 dark:border-gray-900"
      src={image === null ? defaultProfilePicture : image.data}
      alt=""
      layout="fixed"
      width={`${props.size ?? 32}px`}
      height={`${props.size ?? 32}px`}
    />
  ) : (
    <></>
  );
}
