import Link from "next/link";
import Image from "next/image";

const imgSize = 500;

export const buttonClasses = [
  "bg-stone-500",
  "hover:bg-stone-700",
  "text-white",
  "font-thin",
  "py-2",
  "px-6",
  "mx-4",
  "rounded",
  "uppercase",
].join(" ");

export default function Banner({
  data,
  buttons,
  background,
  textColour,
  contactFirst,
  noBlurb,
}) {
  const columnOrder = contactFirst ? "flex-col-reverse" : "flex-col";
  return (
    <div className={`rounded p-4 ${background} ${textColour}`}>
      <div className="flex ">
        <div className="p-4 basis-2/5">
          <Image
            src={data.image}
            alt="Fiona Peake headshot"
            width={imgSize}
            height={imgSize}
          />
        </div>
        <div className="basis-3/5">
          <div className="">
            <h1 className="text-5xl uppercase font-bold p-4">{data.heading}</h1>
          </div>
          <div className="flex">
            {!noBlurb && (
              <div className="text-lg whitespace-pre-wrap basis-1/2 p-4">
                {data.blurb}
              </div>
            )}
            <div className={`flex ${columnOrder} p-4`}>
              <div>
                <p>{data.offering.intro}:</p>
                <ul className="leading-tight">
                  {data.offering.skills.map((skill) => (
                    <li className="list-disc list-inside" key={skill}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="py-5" />
              <ContactDetails contact={data.contact} />
            </div>
          </div>
        </div>
      </div>
      {buttons && (
        <div className="flex justify-end p-4">
          {buttons.map(({ name, path }) => (
            <Button name={name} path={path} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ContactDetails({ contact }) {
  return (
    <div>
      {contact.map(({ name, number }) => (
        <p key={name}>
          <b>
            {name} : {number}
          </b>
        </p>
      ))}
    </div>
  );
}

export function Button({ name, path }) {
  return (
    <Link href={path} key={name}>
      <button className={buttonClasses}>{name}</button>
    </Link>
  );
}
