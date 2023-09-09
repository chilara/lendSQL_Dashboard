import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import account from "../../images/svgs/account.svg";
import audit from "../../images/svgs/audits.svg";
import bank from "../../images/svgs/bank.svg";
import briefcase from "../../images/svgs/briefcase.svg";
import caretDown from "../../images/svgs/caret-down.svg";
import coins from "../../images/svgs/coins.svg";
import fees from "../../images/svgs/fees.svg";
import guarantors from "../../images/svgs/guarantors.svg";
import handshake from "../../images/svgs/hand-shake.svg";
import home from "../../images/svgs/home.svg";
import karma from "../../images/svgs/karma.svg";
import loanRequests from "../../images/svgs/loan-requests.svg";
import loans from "../../images/svgs/loans.svg";
import preferences from "../../images/svgs/preferences.svg";
import reports from "../../images/svgs/reports.svg";
import savings from "../../images/svgs/savings.svg";
import services from "../../images/svgs/services.svg";
import settlement from "../../images/svgs/settlement.svg";
import transactions from "../../images/svgs/transactions.svg";
import userFriends from "../../images/svgs/user-friends.svg";
import whiteList from "../../images/svgs/whitelist.svg";

const sidebarContents = [
  {
    main: "Switch Organization",
    leftIcon: briefcase,
    rightIcon: caretDown,
    sub: null,
  },
  {
    main: "Dashboard",
    leftIcon: home,
    rightIcon: null,
    sub: null,
  },
  {
    main: "Customers",
    leftIcon: null,
    rightIcon: null,
    sub: [
      {
        text: "Users",
        leftImg: userFriends,
        rightImg: null,
      },
      {
        text: "Guarantors",
        leftImg: guarantors,
        rightImg: null,
      },
      {
        text: "Loans",
        leftImg: loans,
        rightImg: null,
      },
      {
        text: "Decision Models",
        leftImg: handshake,
        rightImg: null,
      },
      {
        text: "Savings",
        leftImg: savings,
        rightImg: null,
      },
      {
        text: "Loan Requests",
        leftImg: loanRequests,
        rightImg: null,
      },
      {
        text: "Whitelist",
        leftImg: whiteList,
        rightImg: null,
      },
      {
        text: "Karma",
        leftImg: karma,
        rightImg: null,
      },
    ],
  },
  {
    main: "Businesses",
    leftIcon: null,
    rightIcon: null,
    sub: [
      {
        text: "Organization",
        leftImg: briefcase,
        rightImg: null,
      },
      {
        text: "Loan Products",
        leftImg: loanRequests,
        rightImg: null,
      },
      {
        text: "Savings Products",
        leftImg: bank,
        rightImg: null,
      },
      {
        text: "Fees and Charges",
        leftImg: coins,
        rightImg: null,
      },
      {
        text: "Transactions",
        leftImg: transactions,
        rightImg: null,
      },
      {
        text: "Services",
        leftImg: services,
        rightImg: null,
      },
      {
        text: "Service Account",
        leftImg: account,
        rightImg: null,
      },
      {
        text: "Settlements",
        leftImg: settlement,
        rightImg: null,
      },
      {
        text: "Reports",
        leftImg: reports,
        rightImg: null,
      },
    ],
  },
  {
    main: "settings",
    leftIcon: null,
    rightIcon: null,
    sub: [
      {
        text: "Preferences",
        leftImg: preferences,
        rightImg: null,
      },
      {
        text: "Fees and Pricing",
        leftImg: fees,
        rightImg: null,
      },
      {
        text: "Audit Logs",
        leftImg: audit,
        rightImg: null,
      },
    ],
  },
];

interface SidebarArrayContents {
  main: string;
  leftIcon: string | null;
  rightIcon: string | null;
  sub:
    | {
        text: string;
        leftImg: string | null;
        rightImg: string | null;
      }[]
    | null;
}

interface SidebarSubContents {
  text: string;
  leftImg: string | null;
  rightImg: string | null;
}

const resetNavState = {
  "Switch Organization": false,
  Dashboard: false,
  Customers: false,
  Users: false,
  Guarantors: false,
  Loans: false,
  "Decision Models": false,
  Savings: false,
  "Loan Requests": false,
  Whitelist: false,
  Karma: false,
  Businesses: false,
  Organization: false,
  "Loan Products": false,
  "Savings Products": false,
  "Fees and Charges": false,
  Transactions: false,
  Services: false,
  "Service Account": false,
  Settlements: false,
  Reports: false,
  Preferences: false,
  "Fees and Pricing": false,
  "Audit Logs": false,
};

export const Sidebar: FC<{
  open: boolean;
  toggleMenu: (key: boolean) => void;
}> = ({ open, toggleMenu }) => {
  const navigate = useNavigate();
  const [navState, setNavState] = useState<
    | any
    | {
        "Switch Organization": boolean;
        Dashboard: boolean;
        Users: boolean;
        Guarantors: boolean;
        Loans: boolean;
        "Decision Models": boolean;
        Savings: boolean;
        "Loan Requests": boolean;
        Whitelist: boolean;
        Karma: boolean;
        Organization: boolean;
        "Loan Products": boolean;
        "Savings Products": boolean;
        "Fees and Charges": boolean;
        Transactions: boolean;
        Services: boolean;
        "Service Account": boolean;
        Settlements: boolean;
        Reports: boolean;
        Preferences: boolean;
        "Fees and Pricing": boolean;
        "Audit Logs": boolean;
      }
  >({
    "Switch Organization": false,
    Dashboard: false,
    Customers: false,
    Users: true,
    Guarantors: false,
    Loans: false,
    "Decision Models": false,
    Savings: false,
    "Loan Requests": false,
    Whitelist: false,
    Karma: false,
    Businesses: false,
    Organization: false,
    "Loan Products": false,
    "Savings Products": false,
    "Fees and Charges": false,
    Transactions: false,
    Services: false,
    "Service Account": false,
    Settlements: false,
    Reports: false,
    Preferences: false,
    "Fees and Pricing": false,
    "Audit Logs": false,
  });
  const onClickHandler = (item: SidebarArrayContents) => () => {
    if (!item.sub) {
      setNavState({ ...resetNavState, [item.main]: true });
      if (item.main === "Switch Organization") {
        alert("feature coming out soon");
      } else {
        toggleMenu(!open);
        navigate("/auth/dashboard");
      }
    }
  };
  const subOnClickHandler = (item_: SidebarSubContents) => () => {
    toggleMenu(!open);
    setNavState({ ...resetNavState, [item_.text]: true });
    if (item_.text === "Users") {
      navigate("/auth/dashboard");
    } else {
      navigate("/auth/in-progress");
    }
  };
  return (
    <div
      className={`${
        open ? "block w-2/25" : "d-none"
      } auth lg:block fixed top-0 bottom-0 left-0 lg:w-1/4 y-scroll pt-4-3r all-corn-box-shadow hide-scrollbar bg-white`}
    >
      {sidebarContents.map((item: SidebarArrayContents, index: Number) => {
        return (
          <div
            onClick={onClickHandler(item)}
            className={`mb-10px ${item.sub ? "" : "link"} ${
              navState[item.main] ? "active" : ""
            }`}
            key={`${item.main}-${index}`}
          >
            <div
              className={`flex py-6px pl-2rem ${
                item.sub ? "mt-30px auto" : "mt-0 pointer"
              }`}
            >
              {item.leftIcon ? (
                <img src={item.leftIcon} alt="briefcase" />
              ) : null}
              <span className="title pri-text-color-faint mx-8px py-10px">
                {item.main}
              </span>
              {item.rightIcon ? (
                <img src={item.rightIcon} alt="caret-down" />
              ) : null}
            </div>
            <div>
              {item.sub
                ? item.sub.map((item_: SidebarSubContents, index: Number) => (
                    <div
                      onClick={subOnClickHandler(item_)}
                      className={`flex py-6px pointer mb-10px link pl-60px ${
                        navState[item_.text] ? "active" : ""
                      }`}
                      key={`${item_.text}-${index}`}
                    >
                      {item_.leftImg ? (
                        <img src={item_.leftImg} alt="briefcase" />
                      ) : null}
                      <span className="text-secondary-color-thin mx-8px py-10px">
                        {item_.text}
                      </span>
                      {item_.rightImg ? (
                        <img src={item_.rightImg} alt="caret-down" />
                      ) : null}
                    </div>
                  ))
                : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};
