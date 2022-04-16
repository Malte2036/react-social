import Image from "next/image";
import { useContext } from "react";
import { BackendServiceContext } from "@/lib/contexts/BackendServiceContext";
import defaultProfilePicture from "@/public/default_profile_picture.png";

export default function ProfilePicture(props: {
  imageId: string | null | undefined;
  size?: number;
  borderColorClass?: string;
}) {
  const backendService = useContext(BackendServiceContext);

  return (
    <Image
      className={`rounded-full object-cover border-2 ${
        props.borderColorClass ?? "border-gray-200 dark:border-gray-900"
      }`}
      src={
        props.imageId
          ? backendService.getFileUrlById(props.imageId)
          : defaultProfilePicture
      }
      alt=""
      layout="fixed"
      width={`${props.size ?? 32}px`}
      height={`${props.size ?? 32}px`}
    />
  );
}
