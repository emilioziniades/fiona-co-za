import Layout from "../components/layout";
import Welcome from "../components/welcome";
import { getMarkdownData } from "../utils/markdown";

const cvFile = "resume";

export async function getStaticProps() {
  const mdData = await getMarkdownData(cvFile);
  return {
    props: { mdData },
  };
}
export default function CVPage({ mdData }) {
  console.log(mdData);
  return (
    <Layout>
      <Welcome path="/cv" />
      <div dangerouslySetInnerHTML={{ __html: mdData.contentHtml }} />
    </Layout>
  );
}
