export default function PostViewImage(props: { image: string }) {
  return <img className="w-full rounded-lg border-2 border-black" src={props.image} alt="" />;
}
