import "./ProfilePicture.css";

export default function ProfilePicture(props: { image: string|null}) {
  return (
      <img className="ProfilePicture"  src={props.image?.toString()} alt="" />
  );
}
