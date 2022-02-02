import { MyFile } from "../database/data/myFile";

export default function PostViewImage(props: { image: MyFile | undefined }) {
  return (
    <img
      className="w-full mt-3 rounded-lg border-1 border-gray-200 dark:border-gray-900"
      src={props.image?.data}
      alt=""
    />
  );
}
