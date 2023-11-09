import Header from "@Components/Header/Header";
import s from "./BasicLayout.module.scss";
import { Outlet } from "react-router-dom";

const BasicLayout = () => {
  return (
    <>
      <Header />
      <div className={s.outlet}>
        <Outlet />
      </div>
    </>
  );
};

export default BasicLayout;
