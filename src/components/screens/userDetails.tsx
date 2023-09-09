/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import backIcon from "../../images/svgs/back-button.svg";
import userIcon from "../../images/svgs/user-icon.svg";
import filledStarIcon from "../../images/svgs/filled-star.svg";
import unfilledStarIcon from "../../images/svgs/unfilled-star.svg";

export const UserDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [UserDetailData, setUserDetailData] = useState<{
    createdAt: string;
    orgName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    lastActiveDate: string;
    profile: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      avatar: string;
      gender: string;
      bvn: string;
      address: string;
      currency: string;
    };
    guarantor: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      gender: string;
      address: string;
    };
    accountBalance: string;
    accountNumber: string;
    socials: {
      facebook: string;
      instagram: string;
      twitter: string;
    };
    education: {
      level: string;
      employmentStatus: string;
      sector: string;
      duration: string;
      officeEmail: string;
      monthlyIncome: string;
      loanRepayment: string;
    };
    id: "1";
  } | null>(null);
  let userId: string = "";
  userId = useParams().userId || "";
  const resetLinkStatus = {
    generalDetails: false,
    documents: false,
    bankDetails: false,
    loans: false,
    savings: false,
    appAndSystem: false,
  };
  const [linkStatus, setLinkStatus] = useState({
    generalDetails: true,
    documents: false,
    bankDetails: false,
    loans: false,
    savings: false,
    appAndSystem: false,
  });
  useEffect(() => {
    const fetchData = async () => {
      let data: any = null;
      try {
        setLoading(true);
        const userData = localStorage.getItem(userId);
        if (userData) {
          setUserDetailData(JSON.parse(userData));
          return;
        }
        const res = await fetch(
          `https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users/${userId}`
        );
        data = await res.json();
        if (!data) {
          alert("An error occured while fetching users...");
          return;
        }

        localStorage.setItem(userId, JSON.stringify(data));
        setUserDetailData(data);

        return;
      } catch (err) {
        alert("An error occured while fetching users...");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const linkClickHandler = (item: any) => () => {
    setLinkStatus({ ...resetLinkStatus, [item]: true });
  };
  const Section = (
    <>
      <div className="rounded-sm all-corn-box-shadow mx-4p px-15px">
        <div className="flex flex-col lg:flex-row lg:flex-align-center px-4px py-16px mb-30px">
          <div className="flex flex-justify-between">
            <div className="flex">
              <div className="w-80px h-80px rounded-full flex flex-justify-center flex-align-center  pri-bg-color-1-faint">
                <img
                  className="w-80px h-80px rounded-full"
                  src={UserDetailData?.profile?.avatar || userIcon}
                  alt="user icon"
                />
              </div>
              <div className="ml-8px">
                <p>{`${UserDetailData?.profile?.firstName} ${UserDetailData?.profile?.lastName}`}</p>
                <p>${UserDetailData?.accountNumber}</p>
              </div>
            </div>
            <div className="lg:mx-40px lg:px-40px lg:borderLeftLine lg:borderRightLine">
              <p>User's Tier</p>
              <div>
                <img src={filledStarIcon} alt="star" />
                <img src={unfilledStarIcon} alt="star" />
                <img src={unfilledStarIcon} alt="star" />
              </div>
            </div>
          </div>
          <div>
            <p>{`₦${Number(
              UserDetailData?.accountBalance
            ).toLocaleString()}`}</p>
            <p>{`${UserDetailData?.accountNumber} ${UserDetailData?.orgName}`}</p>
          </div>
        </div>
        <div className="flex overflow-x-scroll lg:overflow-x-auto flex-space-between hide-scrollbar">
          <div
            onClick={linkClickHandler("generalDetails")}
            className={`py-10px ${
              linkStatus.generalDetails
                ? "linkBorderBottomLine pri-text-color-2"
                : ""
            } nowrap px-15px pointer text-inactive`}
          >
            General Details
          </div>
          <div
            onClick={linkClickHandler("documents")}
            className={`py-10px nowrap ${
              linkStatus.documents
                ? "linkBorderBottomLine pri-text-color-2"
                : ""
            } px-15px pointer text-inactive ml-20px mr-20px lg:m-0`}
          >
            Documents
          </div>
          <div
            onClick={linkClickHandler("bankDetails")}
            className={`py-10px nowrap ${
              linkStatus.bankDetails
                ? "linkBorderBottomLine pri-text-color-2"
                : ""
            } px-15px pointer text-inactive mr-20px`}
          >
            Bank Details
          </div>
          <div
            onClick={linkClickHandler("loans")}
            className={`py-10px nowrap ${
              linkStatus.loans ? "linkBorderBottomLine pri-text-color-2" : ""
            } px-15px pointer text-inactive`}
          >
            Loans
          </div>
          <div
            onClick={linkClickHandler("savings")}
            className={`py-10px nowrap ${
              linkStatus.savings ? "linkBorderBottomLine pri-text-color-2" : ""
            } px-15px pointer text-inactive ml-20px mr-20px`}
          >
            Savings
          </div>
          <div
            onClick={linkClickHandler("appAndSystem")}
            className={`py-10px ${
              linkStatus.appAndSystem
                ? "linkBorderBottomLine pri-text-color-2"
                : ""
            } nowrap px-15px pointer text-inactive`}
          >
            App and System
          </div>
        </div>
      </div>
      <div className="px-15px my-50px rounded-sm all-corn-box-shadow mx-4p">
        <div>
          <p className="pt-16px">Personal Information</p>
          <div className="borderBottomLine">
            <div className="flex flex-col lg:flex-row flex-space-between">
              <div>
                <p>FULL NAME</p>
                <p>{`${UserDetailData?.profile?.firstName} ${UserDetailData?.profile?.lastName}`}</p>
              </div>
              <div>
                <p>PHONE NUMBER</p>
                <p>{UserDetailData?.phoneNumber}</p>
              </div>
              <div>
                <p>EMAIL ADDRESS</p>
                <p>{UserDetailData?.email}</p>
              </div>
              <div>
                <p>BVN</p>
                <p>{UserDetailData?.profile?.bvn}</p>
              </div>
              <div>
                <p>GENDER</p>
                <p>{UserDetailData?.profile?.gender}</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row mt-20px">
              <div>
                <p>EMPLOYMENT STATUS</p>
                <p>{UserDetailData?.education.employmentStatus}</p>
              </div>
              <div className="lg:mx-70px">
                <p>CHILDREN</p>
                <p>None</p>
              </div>
              <div>
                <p>TYPE OF RESIDENCE</p>
                <p>Parent's Apartment</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="pt-16px">Education and Employment</p>
          <div className="borderBottomLine">
            <div className="flex flex-wrap flex-col lg:flex-row">
              <div>
                <p className="uppercase">level of education</p>
                <p>{`${UserDetailData?.education?.level}`}</p>
              </div>
              <div className="lg:mx-70px">
                <p className="uppercase">employment status</p>
                <p>{UserDetailData?.education?.employmentStatus}</p>
              </div>
              <div>
                <p className="uppercase">sector of employment</p>
                <p>{UserDetailData?.education?.sector}</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row mt-20px">
              <div>
                <p className="uppercase">office email</p>
                <p>{UserDetailData?.education?.officeEmail}</p>
              </div>
              <div className="lg:mx-70px">
                <p className="uppercase">monthly income</p>
                <p>{`₦${Number(
                  UserDetailData?.education?.monthlyIncome[1]
                ).toLocaleString()} - ₦${Number(
                  UserDetailData?.education?.monthlyIncome[0]
                ).toLocaleString()}`}</p>
              </div>
              <div>
                <p className="uppercase">loan repayment</p>
                <p>{`₦${Number(
                  UserDetailData?.education?.loanRepayment
                ).toLocaleString()}`}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="pt-16px">Socials</p>
          <div className="borderBottomLine">
            <div className="flex flex-col lg:flex-row">
              <div>
                <p className="uppercase">twitter</p>
                <p>{`${UserDetailData?.socials.twitter}`}</p>
              </div>
              <div className="lg:mx-70px">
                <p className="uppercase">facebook</p>
                <p>${UserDetailData?.socials.facebook}</p>
              </div>
              <div>
                <p className="uppercase">instagram</p>
                <p>{UserDetailData?.socials.instagram}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="pt-16px">Guarantor</p>
          <div className="borderBottomLine">
            <div className="flex flex-wrap flex-col lg:flex-row flex-space-between">
              <div>
                <p className="uppercase">full name</p>
                <p>{`${UserDetailData?.guarantor.firstName} ${UserDetailData?.guarantor.lastName}`}</p>
              </div>
              <div>
                <p className="uppercase">phone number</p>
                <p>{UserDetailData?.guarantor.phoneNumber}</p>
              </div>
              <div>
                <p className="uppercase">address</p>
                <p>{UserDetailData?.guarantor.address}</p>
              </div>
              <div>
                <p className="uppercase">gender</p>
                <p>{UserDetailData?.guarantor.gender}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <div className="lg:mr-3p pt-4-3r lg:pt-7-7r lg:ml-26p pri-text-color-1">
      <div
        className="text-size-16 flex pointer pri-text-color-1 normal mx-4p mb-4p"
        onClick={() => navigate("/auth/dashboard")}
      >
        <img src={backIcon} alt="back-icon" />
        <span className="pri-text-color-1 ml-8px">Back to Users</span>
      </div>
      <div className="flex flex-align-center lg:flex-row flex-col flex-space-between mx-4p">
        <h3 className="pri-text-color-1">User Details</h3>
        <div className="flex-row mb-30px lg:mb-0">
          <button className="uppercase b-red-color red-text bg-white rounded-sm p-9px bw-1 letter-spacing bold pointer">
            blacklist user
          </button>
          <button className="uppercase primary2-border-color bg-white rounded-sm p-9px bw-1 status-active-text-color letter-spacing bold ml-8px pointer">
            activate user
          </button>
        </div>
      </div>
      {loading ? (
        <div className="bold flex-align-center flex h-50vh flex-justify-center">
          <span>LOADING...</span>
        </div>
      ) : (
        Section
      )}
    </div>
  );
};
