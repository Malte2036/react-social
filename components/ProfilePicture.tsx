import Image from "next/image";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import BackendService from "../lib/database/backendService";
import { MyFile } from "../lib/database/data/myFile";
import defaultProfilePicture from "../public/default_profile_picture.png";

export default function ProfilePicture(props: {
  backendService: BackendService;
  imageId: string | null;
  size?: number;
}) {
  const [cookie] = useCookies(["bearerToken"]);
  const [image, setImage] = useState<MyFile | null | undefined>(
    props.imageId === null ? null : undefined
  );
  useEffect(() => {
    if (props.imageId != null) {
      props.backendService
        .getFileById(props.imageId!, cookie.bearerToken)
        .then((myFile) => setImage(myFile));
    }
  }, [cookie.bearerToken, props.backendService, props.imageId]);

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
