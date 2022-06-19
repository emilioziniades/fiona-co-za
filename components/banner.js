import Link from "next/link";
import Image from "next/image";

const imgSize = 500;
const buttonClasses =
  "bg-stone-500 hover:bg-stone-700 text-white font-thin py-2 px-6 mx-4 rounded uppercase";

export default function Banner({
  mdData,
  buttons,
  background,
  textColour,
  contactFirst,
}) {
  const columnOrder = contactFirst ? "flex-col-reverse" : "flex-col";
  return (
    <div
      className={`rounded mx-auto max-w-4xl p-4 m-5 ${background} ${textColour}`}
    >
      <div className="flex ">
        <div className="p-4 basis-2/5">
          <Image
            src={mdData.image}
            alt="Fiona Peake headshot"
            width={imgSize}
            height={imgSize}
          />
        </div>
        <div className="basis-3/5">
          <div className="">
            <h1 className="text-5xl uppercase font-bold p-4">
              {mdData.main_heading}
            </h1>
          </div>
          <div className="flex">
            {mdData.blurb && (
              <div className="text-lg whitespace-pre-wrap basis-1/2 p-4">
                {mdData.blurb}
              </div>
            )}
            <div className={`flex ${columnOrder} p-4`}>
              <div>
                <p>{mdData.offering.intro}:</p>
                <ul className="leading-tight">
                  {mdData.offering.skills.map((skill) => (
                    <li className="list-disc list-inside" key={skill}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="py-5" />
              <div>
                {mdData.contact.map(({ name, number }) => (
                  <p key={name}>
                    <b>
                      {name} : {number}
                    </b>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {buttons && (
        <div className="flex justify-end p-4">
          {buttons.map(({ name, path }) => (
            <Link href={path} key={name}>
              <button className={buttonClasses}>{name}</button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
