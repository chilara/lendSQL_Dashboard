import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../common/card";
import users from "../../images/svgs/users.svg";
import eye from "../../images/svgs/eye.svg";
import karma from "../../images/svgs/karma.svg";
import whiteList from "../../images/svgs/whitelist.svg";
import activeUsers from "../../images/svgs/active-users.svg";
import usersWithLoans from "../../images/svgs/users-with-loan.svg";
import usersWithSavings from "../../images/svgs/users-with-saving.svg";
import { Filter } from "../common/filter";
import { statusEnum } from "../../constants";
import threeDots from "../../images/svgs/three-dots.svg";
import { Status, StatusText } from "../common/displayStatus";

const resetFilter = {
  organization: false,
  username: false,
  email: false,
  phoneNumber: false,
  status: false,
  dateJoined: false,
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    organization: false,
    username: false,
    email: false,
    phoneNumber: false,
    status: false,
    dateJoined: false,
  });
  const [loading, setLoaing] = useState(false);
  const [viewOptions, setViewOptions] = useState<any>({});
  const [usersList, setUsersList] = useState<[] | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      let data: any = [];
      try {
        setLoaing(true);
        const res = await fetch(
          "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users"
        );
        data = await res.json();
        if (!data) {
          alert("An error occured while fetching users...");
          return;
        }
        data =
          data &&
          data.map((item: Object) => ({
            ...item,
            status: statusEnum[Math.floor(Math.random() * 4)],
          }));
        setUsersList(data);
        return;
      } catch (err) {
        alert("An error occured while fetching users...");
      } finally {
        setLoaing(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="lg:mr-3p pt-4-3r lg:pt-7-7r lg:ml-26p">
      <p className="size-25px pri-text-color-1 normal letter-spacing mx-4p mb-4p">
        Users
      </p>
      <div className="flex flex-col lg:flex-row flex-space-between mx-4p">
        <Card title="Users" imgLink={users} value="2453" />
        <Card title="active users" imgLink={activeUsers} value="2453" />
        <Card title="users with loans" imgLink={usersWithLoans} value="12453" />
        <Card
          title="users with savings"
          imgLink={usersWithSavings}
          value="102453"
        />
      </div>
      <div className="mx-4p p-15px mt-40px bg-white all-corn-box-shadow rounded-sm mb-90px">
        <div className="lg:flex pri-text-color-1 d-none flex-space-between mb-30px">
          <Filter
            onClick={() => setFilter({ ...resetFilter, organization: true })}
            resetFilter={() =>
              setFilter({ ...resetFilter, organization: false })
            }
            title="organization"
            filter={filter}
          />
          <Filter
            onClick={() => alert("Feature coming soon...")}
            filter={filter}
            title="username"
          />
          <Filter
            onClick={() => alert("Feature coming soon...")}
            filter={filter}
            title="email"
          />
          <Filter
            onClick={() => alert("Feature coming soon...")}
            filter={filter}
            title="phone number"
          />
          <Filter
            onClick={() => alert("Feature coming soon...")}
            filter={filter}
            title="date joined"
          />
          <Filter
            onClick={() => alert("Feature coming soon...")}
            filter={filter}
            title="status"
          />
          <img className="hidden" src={threeDots} alt="3-dots" />
        </div>
        {loading ? (
          <p className="text-align-center pri-text-color-1 bold">LOADING....</p>
        ) : (
          usersList &&
          usersList.map(
            (
              item: {
                orgName: string;
                userName: string;
                email: string;
                phoneNumber: string;
                createdAt: string;
                status: string;
                id: number;
              },
              index: Number
            ) => (
              <div
                key={`item-${index}-${item.phoneNumber}`}
                className="flex flex-row flex-space-between td-cont pri-text-color-1 flex-align-center"
              >
                <div className="block lg:d-none size-13px">
                  <div className="">
                    <span className="bold mr-8px">Organization:</span>
                    <span>{item.orgName}</span>
                  </div>
                  <div className="py-16px">
                    <span className="bold mr-8px">Email:</span>
                    <span>{item.email}</span>
                  </div>
                  <div className="flex flex-align-center">
                    <span className="bold mr-8px">Status:</span>
                    <StatusText status={item.status} />
                  </div>
                </div>
                <div className="lg:td d-none lg:block">{item.orgName}</div>
                <div className="lg:td d-none lg:block">{item.userName}</div>
                <div className="lg:td d-none lg:block">{item.email}</div>
                <div className="lg:td d-none lg:block">{item.phoneNumber}</div>
                <div className="lg:td d-none lg:block">{item.createdAt}</div>
                <Status item={item} />
                {viewOptions[String(item.id)] ? (
                  <div className="relative">
                    <div className="bold -right-15 top-5 grey-border-color p-10px rounded-sm all-corn-box-shadow absolute bg-white z-1 bw-1 b-solid w-190px">
                      <div
                        className="flex pointer flex-align-center"
                        onClick={() => navigate(`/auth/user/detail/${item.id}`)}
                      >
                        <img src={eye} alt="view icon" />
                        <small className="ml-8px">View Details</small>
                      </div>
                      <div className="flex pointer flex-align-center my-25px">
                        <img src={karma} alt="blaclist icon" />
                        <small className="ml-8px">Blacklist User</small>
                      </div>
                      <div className="flex pointer flex-align-center">
                        <img src={whiteList} alt="activate icon" />
                        <small className="ml-8px">Activate User</small>
                      </div>
                    </div>
                  </div>
                ) : null}
                <img
                  src={threeDots}
                  alt="3-dots"
                  className="pointer"
                  onClick={() =>
                    setViewOptions({ ...{}, [item.id]: !viewOptions[item.id] })
                  }
                />
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};
