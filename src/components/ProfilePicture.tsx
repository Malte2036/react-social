export default function ProfilePicture(props: { image: string | null }) {
  return (
    <img
      className="h-8 w-8 rounded-full ml-3 object-cover border-2 border-gray-200 dark:border-gray-900"
      src={props.image?.toString()}
      alt=""
    />
  );
}
