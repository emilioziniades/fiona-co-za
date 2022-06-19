import Layout from "../components/layout";
import Banner from "../components/banner";
import { getMarkdownData } from "../utils/markdown";

const cvFile = "resume";
const proseStyle =
  "prose-lg prose-h1:underline prose-h1:text-4xl prose-h2:m-1 prose-h2:text-2xl prose-h2:font-semibold prose-li:list-disc ";

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
        contactFirst
      />
      <div className="pt-10"></div>
      <article
        className={`flex justify-center max-w-4xl mx-auto ${proseStyle}`}
      >
        <div dangerouslySetInnerHTML={{ __html: mdData.contentHtml }} />
      </article>
    </Layout>
  );
}
