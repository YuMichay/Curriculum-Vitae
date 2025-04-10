import { Outlet } from "react-router-dom";

import { Header } from "../../widgets";

interface RouteLayoutProps {
  isAuthPage: boolean;
}

const RouteLayout: React.FC<RouteLayoutProps> = ({ isAuthPage }) => {
  return (
    <div className='app__container'>
      {isAuthPage && <Header />}
      <div className='main'>
        <Outlet />
      </div>
    </div>
  )
};

export default RouteLayout;