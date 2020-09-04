import React, { Fragment } from "react";
import NavigationBuild from "../../components/Navigation-Build/Navigation-Build";
import TeamsButtonListEdit from "../../components/TeamsButtonList-Edit/TeamsButtonList-Edit";
import TeamListEdit from "../../components/TeamList-Edit/TeamList-Edit";
import FolderList from "../../components/FoldersList/FoldersList";
import Footer from "../../components/Footer/Footer";
import "./BuildPage.css";

const BuildPage = (props: any): JSX.Element => {
  return (
    <Fragment>
      <NavigationBuild />
      <main>
        <header role="banner">
          <FolderList />
        </header>
        <TeamsButtonListEdit />
        <TeamListEdit />
        <Footer />
      </main>
    </Fragment>
  );
};

export default BuildPage;
