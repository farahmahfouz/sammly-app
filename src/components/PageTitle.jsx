import { Helmet } from "react-helmet-async";

export default function PageTitle({ title }) {
  return (
    <Helmet>
      <title>{`Sammly | ${title}`}</title>
    </Helmet>
  );
}