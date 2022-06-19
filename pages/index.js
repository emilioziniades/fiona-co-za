import Layout from "../components/layout";
import Banner from "../components/banner";

import { getMarkdownData } from "../utils/markdown";

const bannerFile = "index";
const actionButtons = [
  { name: "my cv", path: "/cv" },
  { name: "design portfolio", path: "/projects" },
];

export async function getStaticProps() {
  const mdData = await getMarkdownData(bannerFile);
  return {
    props: { mdData },
  };
}
export default function HomePage({ mdData }) {
  console.log(mdData.blurb);
  return (
    <Layout background="bg-stone-700">
      <div className="pt-10"></div>
      <Banner
        mdData={mdData}
        buttons={actionButtons}
        background="bg-gray-200"
        textColour="text-gray-800"
      />
    </Layout>
  );
}
