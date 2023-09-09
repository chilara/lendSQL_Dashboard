import { FC } from "react";

export const StatusText: FC<{ status: string }> = ({ status }) => (
  <span
    className={`${
      status.toLowerCase() === "inactive"
        ? "status-inactive-text-color status-inactive"
        : status.toLowerCase() === "pending"
        ? "status-pending-text-color status-pending"
        : status.toLowerCase() === "blacklisted"
        ? "status-blacklisted-text-color status-blacklisted"
        : status.toLowerCase() === "active"
        ? "status-active-text-color status-active"
        : ""
    } title bold lg:bg-none w-100px inline-block lg:inline`}
  >
    {status}
  </span>
);

export const Status: FC<{ item: { status: string } }> = ({ item }) => (
  <div
    className={`lg:td d-none lg:block ${
      item.status.toLowerCase() === "inactive"
        ? "status-inactive"
        : item.status.toLowerCase() === "pending"
        ? "status-pending"
        : item.status.toLowerCase() === "blacklisted"
        ? "status-blacklisted"
        : item.status.toLowerCase() === "active"
        ? "status-active"
        : ""
    }`}
  >
    <StatusText status={item.status} />
  </div>
);
