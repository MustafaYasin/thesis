import Filter2 from "../components/filter/Filter2";
import ProfileListMini from "../components/profiles/ProfileListMini";
import classes from "./RecommendedProfilesPage.module.css";
import Card from "../components/ui/Card";
//import { useState, useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import DetailsContext from "../components/store/details-context.js";
import Backdrop from "../components/ui/Backdrop";
import ProfileList from "../components/profiles/ProfileList";
import Modal from "../components/ui/Modal";
import { useEffect } from "react";
import { DUMMY_DATA } from "../data";

function RecommendedProfilesPage2() {
  const detailsCtx = useContext(DetailsContext);
  const [recommendedProfiles, setRecommendedProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [feature1Factor, setFeature1Factor] = useState(1);
  const [feature2Factor, setFeature2Factor] = useState(1);
  const [feature3Factor, setFeature3Factor] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5001/recommend?username=deshraj")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const allUsers = [];
        const individualUser = data.recommended_users;
        for (const key in individualUser) {
          console.log(individualUser[key]);
          const individualUser2 = {
            id: key,
            ...individualUser[key],
          };
          allUsers.push(individualUser2);
        }
        setIsLoading(false);
        setRecommendedProfiles(allUsers);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>loading...</p>
      </section>
    );
  }

  return (
    <div className={classes.recommendedProfilesPage}>
      <div className={classes.filter}>
        <Filter2
          setFilteredProfiles={setFilteredProfiles}
          allProfiles={recommendedProfiles}
          feature1Factor={feature1Factor}
          feature2Factor={feature2Factor}
          feature3Factor={feature3Factor}
          setFeature1Factor={setFeature1Factor}
          setFeature2Factor={setFeature2Factor}
          setFeature3Factor={setFeature3Factor}
        />
      </div>
      <div className={classes.profilesContainer}>
        <div className={classes.profilesHeading}>
          <h1>Recommended Profiles for you</h1>
        </div>
        <motion.div layout>
          <div className={classes.profilesCard}>
            <Card>
              <div className={classes.profilesListHeading}>
                <p>people you may want to hire?</p>
              </div>
              <div className={classes.profilesList}>
                <ProfileListMini
                  profiles={filteredProfiles}
                  feature1Factor={feature1Factor}
                  feature2Factor={feature2Factor}
                  feature3Factor={feature3Factor}
                />
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
      {detailsCtx.totalDetails && (
        <>
          <Backdrop onClick={detailsCtx.removeDetails} />
          <Modal closeModalHandler={detailsCtx.removeDetails}>
            <ProfileList profiles={detailsCtx.details} />
          </Modal>
        </>
      )}
    </div>
  );
}

export default RecommendedProfilesPage2;
