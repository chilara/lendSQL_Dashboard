import { FC, MouseEventHandler } from "react";
import filterIcon from "../../images/pngs/filter-results-button.png";
import caretDown from "../../images/svgs/arrow-down.svg";
import dateIcon from "../../images/svgs/calendar.svg";

import { TextInput } from "./input";

export const Filter: FC<{
  title: string;
  resetFilter?: any;
  filter: {
    organization: boolean;
    username: boolean;
    email: boolean;
    phoneNumber: boolean;
    status: boolean;
    dateJoined: boolean;
  };
  onClick?: MouseEventHandler<HTMLDivElement>;
}> = ({ title, onClick, filter, resetFilter }) => {
  return (
    <div
      className="flex pointer relative w-15p flex-align-center"
      onClick={onClick}
    >
      {filter.organization && title === "organization" ? (
        <form className="all-corn-box-shadow flex flex-col top-40 py-10px px-15px z-1 grey-border-color absolute rounded-sm bg-white bw-1 b-solid w-190p">
          <TextInput
            placeholder="Select"
            label="Organization"
            icon={caretDown}
            iconAlt="caret-down"
          />
          <TextInput placeholder="Username" label="Username" />
          <TextInput placeholder="Email" label="Email" />
          <TextInput
            placeholder="Date"
            label="Date"
            icon={dateIcon}
            iconAlt="Date Icon"
          />
          <TextInput placeholder="Phone Number" label="Phone Number" />
          <TextInput placeholder="Select" label="Status" />
          <div className="flex">
            <button className="w-45p bold text-inactive rounded-sm p-9px bw-1 b-solid bg-white dark-border-color">
              Reset
            </button>
            <button
              className="w-45p bold ml-8px text-white pri-bg-color-2 rounded-sm p-9px bw-1 b-solid primary2-border-color"
              onClick={resetFilter}
            >
              Filter
            </button>
          </div>
        </form>
      ) : null}
      <p className="bold pri-text-color-1 uppercase lg:th-td">{title}</p>
      <img src={filterIcon} className="ml-8px square-12px" alt="filter-img" />
    </div>
  );
};
