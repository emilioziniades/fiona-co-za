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
      <article className="flex justify-center max-w-4xl prose-lg prose-li:list-disc mx-auto">
        <div dangerouslySetInnerHTML={{ __html: mdData.contentHtml }} />
      </article>
    </Layout>
  );
}
