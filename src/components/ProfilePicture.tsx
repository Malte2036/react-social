import { MyFile } from "../database/data/myFile";

export default function ProfilePicture(props: { image: MyFile | null }) {
  return (
    <img
      className="h-8 w-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-900"
      src={props.image?.data}
      alt=""
    />
  );
}
