import { Fragment } from "react";
import { useQuery } from "react-query";
import EditorContainer from "../../components/admin-sampler-page/EditorContainer";
import { getSamplerById } from "../../lib/api";
import Loader from "../../components/Loader";
import { GetServerSideProps } from "next";

export default function SamplerEditor({ id }) {
  // const theme = useTheme ();
  // const mdMatches = useMediaQuery (theme.breakpoints.up ('md'));

  /*
  gql code
  const {data, refetch} = useQuery (SAMPLER_QUERY, {variables: {id}});
  if (!data) return <div>Loading...</div>;
  const {Samplers_by_id: sampler} = data;
  */

  const { status, data, error, isFetching, isSuccess, refetch } = useQuery(
    "sampler",
    async () => getSamplerById(id)
  );

  // console.log (data);
  return (
    <Fragment>
      {isSuccess && data.id === id && (
        <EditorContainer sampler={data} refetch={refetch} />
      )}
      {isFetching && <Loader />}
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;

  return {
    props: { id },
  };
};
