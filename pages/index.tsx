export async function getServerSideProps(context) {
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
