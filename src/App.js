import styled from "styled-components";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./custom-react-notification.css";
import Layout from "./pages/Layout/Layout";
import Landing from "./pages/Landing/Landing";
import Marketplace from "./pages/Marketplace/Marketplace";
import Mint from "./pages/Mint/Mint";
import Wardrobe from "./pages/Wardrobe/Wardrobe";
import Collection from "./pages/Collection/Collection";
import ProjectAndTeam from "./pages/ProjectAndTeam/ProjectAndTeam";
import WallOfSandy from "./pages/WallOfSandy/WallOfSandy";
import Treasure from "./pages/Treasure/Treasure";
import "./actions/baseURL";

const App = () => {
  return (
    <BrowserRouter>
      <StyledComponent>
        <Layout>
          <Routes>
            <Route>
              <Route path="/" element={<Landing />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/mint" element={<Mint />} />
              <Route path="/wardrobe" element={<Wardrobe />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/wallofsandy" element={<WallOfSandy />} />
              <Route path="/projectandteam" element={<ProjectAndTeam />} />
              <Route path="/treasure" element={<Treasure />} />
            </Route>
          </Routes>
        </Layout>
      </StyledComponent>
      <NotificationContainer />
    </BrowserRouter>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgb(188, 156, 123);

  /* background-color: rgb(39, 24, 63); */
`;

export default App;
