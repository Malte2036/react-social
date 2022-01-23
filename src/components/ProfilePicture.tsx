import "./ProfilePicture.css";

export default function ProfilePicture(props: { image: string }) {
  console.log(props.image);
  return (
      <img className="ProfilePicture" src={props.image} alt="ProfilePicture" />
  );
}
