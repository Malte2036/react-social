export default function ProfilePicture(props: { image: string | null }) {
  return (
    <img
      className="h-8 w-8 rounded-full ml-3 object-cover border-2 border-black"
      src={props.image?.toString()}
      alt=""
    />
  );
}
