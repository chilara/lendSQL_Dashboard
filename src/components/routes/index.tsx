import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../screens/dashboard";
import { Login } from "../screens/login";
import { Lost } from "../screens/lost";
import { UserDetails } from "../screens/userDetails";
import { WorkInProgress } from "../screens/workInProgress";
import { AuthenticatedRoute } from "./protectRoutes";

export const Paths = () => {
  return (
    <div className="work-sans">
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route index path="/login" element={<Login />} />
        <Route path="/auth" element={<AuthenticatedRoute />}>
          <Route path="dashboard" index element={<Dashboard />} />
          <Route path="user/detail/:userId" element={<UserDetails />} />
          <Route path="in-progress" element={<WorkInProgress />} />
        </Route>
        <Route path="/*" element={<Lost />} />
      </Routes>
    </div>
  );
};
