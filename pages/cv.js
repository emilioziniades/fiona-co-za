import Layout from "../components/layout";
import Banner from "../components/banner";
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
    <Layout backgroundColour="bg-gray-200">
      <div className="pt-10"></div>
      <Banner
        mdData={mdData}
        background="bg-stone-800"
        textColour="text-gray-200"
      />
      <div className="pt-10"></div>
      <article className="flex justify-center max-w-4xl prose-lg prose-li:list-disc mx-auto">
        <div dangerouslySetInnerHTML={{ __html: mdData.contentHtml }} />
      </article>
    </Layout>
  );
}
