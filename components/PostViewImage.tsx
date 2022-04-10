import { useContext } from "react";
import { useCookies } from "react-cookie";
import { BackendServiceContext } from "@/lib/contexts/BackendServiceContext";
import useSWR from "swr";

export default function PostViewImage(props: { imageId: string | null }) {
  const backendService = useContext(BackendServiceContext);
  const [cookie] = useCookies(["bearerToken"]);

  const { data: image } = useSWR(
    `/files/${props.imageId}`,
    async () =>
      await backendService.getFileById(props.imageId!, cookie.bearerToken)
  );

  return (
    <img
      className="w-full mt-3 rounded-lg border-1 border-gray-200 dark:border-gray-900"
      src={image?.data}
      alt=""
    />
  );
}
