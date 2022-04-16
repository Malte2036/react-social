import { useContext } from "react";
import { BackendServiceContext } from "@/lib/contexts/BackendServiceContext";

export default function PostViewImage(props: { imageId: string | null }) {
  const backendService = useContext(BackendServiceContext);

  return (
    <img
      className="w-full mt-3 rounded-lg border-1 border-gray-200 dark:border-gray-900"
      src={backendService.getFileUrlById(props.imageId ?? "")}
      alt={props.imageId ?? ""}
    />
  );
}
