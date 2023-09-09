import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/svgs/logo.svg";
import loginPhoto from "../../images/svgs/signin-photo.svg";

const emailRe = /^([a-z0-9_\-.]+)@([a-z]+)\.([a-z]{2,3})$/;

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formField, setFormField] = useState({
    password: "",
    email: "",
  });
  const [formFieldTouched, setFormFieldTouched] = useState<any>({
    email: "",
    password: "",
  });
  const [formFieldError, setFormFieldError] = useState<{
    email: string;
    password: string;
  }>({
    password: "",
    email: "",
  });

  const handleShowPasswordClick = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const validate = useCallback(
    (fields: { password: string; email: string }, submitted?: boolean) => {
      const { password, email } = fields;
      if (submitted) {
        if (!password) {
          setFormFieldError((prev: { email: string; password: string }) => ({
            ...prev,
            password: "please enter your password",
          }));
        } else {
          setFormFieldError((prev: { email: string; password: string }) => ({
            ...prev,
            password: "",
          }));
        }
        if (!emailRe.test(email)) {
          setFormFieldError((prev: { email: string; password: string }) => ({
            ...prev,
            email: "please enter a valid email address",
          }));
        } else {
          setFormFieldError((prev: { email: string; password: string }) => ({
            ...prev,
            email: "",
          }));
        }
      } else {
        if (formFieldTouched.password) {
          if (!password) {
            setFormFieldError((prev: { email: string; password: string }) => ({
              ...prev,
              password: "please enter your password",
            }));
          } else {
            setFormFieldError((prev: { email: string; password: string }) => ({
              ...prev,
              password: "",
            }));
          }
        }
        if (formFieldTouched.email) {
          if (!emailRe.test(email)) {
            setFormFieldError((prev: { email: string; password: string }) => ({
              ...prev,
              email: "please enter a valid email address",
            }));
          } else {
            setFormFieldError((prev: { email: string; password: string }) => ({
              ...prev,
              email: "",
            }));
          }
        }
      }
      if (password && emailRe.test(email)) {
        return true;
      } else {
        return false;
      }
    },
    [formFieldTouched]
  );

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    validate({ ...formField, [name]: value });
    setFormField((prevFormField) => ({
      ...prevFormField,
      [name]: value,
    }));
  };

  const handleFocus = useCallback(
    (event: { target: { name: string; value: string } }) => {
      const { name } = event.target;
      if (!formFieldTouched[name]) {
        setFormFieldTouched(
          (prevFormField: { email: string; password: string }) => ({
            ...prevFormField,
            [name]: true,
          })
        );
      }
      validate(formField);
    },
    [formFieldTouched, formField, validate]
  );

  const handleSubmit = (values: { email: string; password: string }) => () => {
    try {
      setLoading(true);
      const isFormValid = validate(values, true);
      if (isFormValid) {
        localStorage.setItem("token", `lue-${values.email}-xxx`);
        navigate("/auth/dashboard", { replace: true });
      }
    } catch (error: { message: string } | any) {
      alert(error?.message || "An error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="flex md:flex-space-around flex-justify-center flex-col md:flex-row">
        <div className="flex flex-col w-full md:w-7/10">
          <img
            src={logo}
            className="w-1/4 ml-50px mt-40px mb-90px"
            alt="logo"
          />
          <img src={loginPhoto} alt="logo" />
        </div>
        <form
          onSubmit={(event) => event.preventDefault()}
          className="flex flex-justify-center flex-col md:w-1/2 md:mx-1 left-shadow"
        >
          <div className="text-left mx-1 md:w-full">
            <p className="ml-10p bold pri-text-color-1 text-lg">Welcome!</p>
            <p className="ml-10p sec-text-color-1">Enter details to login</p>
            <>
              <div
                className={`w-full p-10px mt-20px b-solid bw-1 ${
                  formFieldError.email ? "b-red-color" : "grey-border-color"
                } rounded-sm flex flex-row flex-space-between flex-align-center`}
              >
                <input
                  placeholder="Email"
                  name="email"
                  value={formField.email}
                  onFocus={handleFocus}
                  onChange={handleChange}
                  className="w-full text-size-12 no-outline b-none"
                />
              </div>
              {formFieldError.email ? (
                <small className="red-text">{formFieldError.email}</small>
              ) : null}
            </>
            <>
              <div
                className={`w-full p-10px mt-20px b-solid bw-1 ${
                  formFieldError.password ? "b-red-color" : "grey-border-color"
                } rounded-sm flex flex-row flex-space-between flex-align-center`}
              >
                <input
                  value={formField.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onFocus={handleFocus}
                  onChange={handleChange}
                  name="password"
                  className="w-2/25 text-size-12 b-none rounded-sm no-outline"
                />
                <span
                  onClick={handleShowPasswordClick}
                  className="text-size-12 pointer bold pri-text-color-2"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </span>
              </div>
              {formFieldError.password ? (
                <small className="red-text">{formFieldError.password}</small>
              ) : null}
            </>
            <p className="text-size-12 bold pri-text-color-2">
              FORGOT PASSWORD?
            </p>
            <button
              onClick={handleSubmit(formField)}
              className="w-full pointer mb-90px md:mb-0 primary2-border-color mt-30px b-none rounded-sm pri-bg-color-2 p-10px text-white bold"
            >
              {loading ? "Please Wait..." : "LOG IN"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
