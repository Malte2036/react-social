export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/home",
      permanent: true,
    },
  };
}

export default function Main() {
  return <></>;
}
