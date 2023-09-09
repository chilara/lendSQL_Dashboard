import { FC } from "react";

type Props = {
  title: string;
  imgLink: string;
  value: string;
};
export const Card: FC<Props> = ({ title, imgLink, value }) => {
  return (
    <div className="bg-white p-15px w-full lg:w-23p all-corn-box-shadow rounded-sm mb-30px lg:mb-0">
      <img src={imgLink} alt={`${title}-img`} />
      <h3 className="size-15px uppercase pri-text-color-faint regular">
        {title}
      </h3>
      <h3 className="bold pri-text-color-1 letter-spacing">
        {Number(value).toLocaleString()}
      </h3>
    </div>
  );
};
