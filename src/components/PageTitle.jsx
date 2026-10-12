import { Helmet } from "react-helmet-async";

export default function PageTitle({ title, description, noIndex = false }) {
  return (
    <Helmet>
      <title>{`${title}`}</title>
      {description && <meta name="description" content={description} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
}