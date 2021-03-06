import Layout from "../components/layout";
import { getMarkdownData } from "../lib/markdown";
import { ContactDetails, buttonClasses } from "../components/banner";

export async function getStaticProps() {
  const infoData = await getMarkdownData("index", "pages");
  const mdData = await getMarkdownData("contact", "pages");
  const data = { ...infoData, ...mdData };
  return {
    props: { data },
  };
}

export default function ContactPage({ data }) {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl md:p-4 p-2 text-gray-700">
        <h1 className="uppercase font-bold md:text-5xl text-3xl">
          {data.heading}
        </h1>
        <div className="md:py-6 py-2"></div>
        <div className="flex md:flex-row flex-col">
          <div className="basis-1/3">
            <ContactDetails contact={data.contact} />
          </div>
          <div className="basis-2/3">
            <div className="pb-4 mt-5">{data.contact_message}</div>
            <form
              name="contact"
              method="POST"
              className="flex-col"
              data-netlify="true"
              netlify-honeypot="bot-field"
              action="/"
            >
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />
              <FormInput type="text" name="name" placeholder="Name" required />
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <FormInput type="text" name="subject" placeholder="Subject" />
              <FormInput textArea name="message" placeholder="Message" />
              <div className="flex justify-end ">
                <button type="submit" className={buttonClasses}>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FormInput({ type, name, placeholder, textArea, required }) {
  const pStyles = "p-1";
  const inputStyles = [
    "bg-yellow-50",
    "w-full",
    "border-none",
    "focus:ring-transparent",
  ].join(" ");

  return (
    <p className={pStyles}>
      {textArea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          className={inputStyles + " resize-none"}
          rows="5"
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={required ? placeholder + " *" : placeholder}
          className={inputStyles}
          required={required}
        />
      )}
    </p>
  );
}
