import { FC } from "react";

export const TextInput: FC<{
  placeholder: string;
  label: string;
  icon?: string;
  iconAlt?: string;
}> = ({ placeholder, label, icon, iconAlt }) => {
  return (
    <div className="mb-30px">
      <label>
        <small>{label}</small>
      </label>
      <div className="w-full mt-10px grey-border-color p-9px rounded-sm bw-1 b-solid relative">
        <input
          className={`no-outline b-none ${icon ? "w-90p" : "w-full"}`}
          placeholder={placeholder}
        />
        {icon ? (
          <span className="w-40px absolute right-0 top-0 bottom-0 flex flex-align-center rounded-sm-tr rounded-sm-br flex-justify-center">
            <img src={icon} alt={iconAlt || ""} />
          </span>
        ) : null}
      </div>
    </div>
  );
};
