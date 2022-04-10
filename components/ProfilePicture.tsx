import Image from "next/image";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import useSWR from "swr";
import { BackendServiceContext } from "@/lib/contexts/BackendServiceContext";
import defaultProfilePicture from "@/public/default_profile_picture.png";

export default function ProfilePicture(props: {
  imageId: string | null;
  size?: number;
  borderColorClass?: string;
}) {
  const [cookie] = useCookies(["bearerToken"]);
  const backendService = useContext(BackendServiceContext);

  const { data: image } = useSWR(
    props.imageId ? `/files/${props.imageId}` : null,
    async () =>
      await backendService.getFileById(props.imageId!, cookie.bearerToken)
  );

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
