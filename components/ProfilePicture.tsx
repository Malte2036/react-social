import Image from "next/image";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import BackendService from "../lib/database/backendService";
import { MyFile } from "../lib/database/data/myFile";

export default function ProfilePicture(props: {
  backendService: BackendService;
  imageId: number | null;
  size?: number;
}) {
  const [cookie] = useCookies(["bearerToken"]);
  const [image, setImage] = useState<MyFile | null | undefined>(
    props.imageId === null ? null : undefined
  );
  useEffect(() => {
    props.backendService
      .getFileById(props.imageId!, cookie.bearerToken)
      .then((myFile) => setImage(myFile));
  }, [cookie.bearerToken, props.backendService, props.imageId]);

  return (
    <div className={`h-${props.size ?? 8} w-${props.size ?? 8}`}>
      {image ? (
        <Image
          className="rounded-full object-cover border-2 border-gray-200 dark:border-gray-900"
          src={image.data}
          alt=""
          layout="responsive"
          width="64px"
          height="64px"
        />
      ) : (
        <></>
      )}
    </div>
  );
}
