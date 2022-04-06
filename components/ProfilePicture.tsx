import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BackendServiceContext } from "../lib/contexts/BackendServiceContext";
import { MyFile } from "../lib/database/data/myFile";
import defaultProfilePicture from "../public/default_profile_picture.png";

export default function ProfilePicture(props: {
  imageId: string | null;
  size?: number;
  borderColorClass?: string;
  picture?: MyFile;
  doNotFetchPicture?: boolean;
}) {
  const [cookie] = useCookies(["bearerToken"]);
  const backendService = useContext(BackendServiceContext);

  const [image, setImage] = useState<MyFile | null | undefined>(
    props.imageId === null ? null : undefined
  );

  useEffect(() => {
    setImage(props.picture);
    return () => setImage(undefined);
  }, [props.picture]);

  useEffect(() => {
    if (!props.doNotFetchPicture && props.imageId != null) {
      console.log("fetch")
      backendService
        .getFileById(props.imageId!, cookie.bearerToken)
        .then((myFile) => setImage(myFile));
    }
    return () => setImage(undefined);
  }, [
    cookie.bearerToken,
    backendService,
    props.imageId,
    props.doNotFetchPicture,
  ]);

  return image !== undefined || props.imageId == null ? (
    <Image
      className={`rounded-full object-cover border-2 ${
        props.borderColorClass ?? "border-gray-200 dark:border-gray-900"
      }`}
      src={
        image === null || props.imageId == null
          ? defaultProfilePicture
          : image.data
      }
      alt=""
      layout="fixed"
      width={`${props.size ?? 32}px`}
      height={`${props.size ?? 32}px`}
    />
  ) : (
    <div
      className={`rounded-full border-2 ${
        props.borderColorClass ?? "border-gray-200 dark:border-gray-900"
      }`}
      style={{
        width: `${props.size ?? 32}px`,
        height: `${props.size ?? 32}px`,
      }}
    />
  );
}
