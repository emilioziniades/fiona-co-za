import Link from "next/link";
import Image from "next/image";

const imgSize = 530;
const buttonClasses =
  "bg-stone-500 hover:bg-stone-700 text-white font-thin py-2 px-6 mx-4 rounded uppercase";

export default function Banner({ mdData, buttons, background, textColour }) {
  return (
    <div
      className={`rounded mx-auto max-w-4xl p-8 ${background} ${textColour}`}
    >
      <div className="flex flex-row justify-center">
        <div className="flex flex-col p-4">
          <Image src={mdData.image} width={imgSize} height={imgSize} />
        </div>
        <div className="flex flex-col p-4 basis-1/3">
          <h1 className="text-5xl uppercase font-bold py-2">
            {mdData.main_heading}
          </h1>
          <div className="py-2" />
          {mdData.blurb && (
            <div className="text-lg whitespace-pre-wrap">{mdData.blurb}</div>
          )}
        </div>
        <div className="flex flex-col basis-1/3 p-4">
          <div className="py-10" />
          <div>{mdData.offering.intro}:</div>
          <ul className="leading-tight">
            {mdData.offering.skills.map((skill) => (
              <li className="list-disc list-inside">{skill}</li>
            ))}
          </ul>
          <div className="py-6" />
          <div>
            {mdData.contact.map(({ name, number }) => (
              <>
                <p>{name} :</p>
                <p>{number}</p>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="py-5" />
      {buttons && (
        <div className="flex justify-end">
          {buttons.map(({ name, path }) => (
            <Link href={path}>
              <button className={buttonClasses}>{name}</button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
