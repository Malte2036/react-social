import "./PostViewImage.css";

export default function PostViewImage(props: { image: string }) {
  return <img className="PostViewImage" src={props.image} alt="" />;
}
