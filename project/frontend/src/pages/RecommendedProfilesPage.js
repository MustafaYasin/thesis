import Filter from "../components/filter/Filter";
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

function RecommendedProfilesPage() {
  const detailsCtx = useContext(DetailsContext);
  const [recommendedProfiles, setRecommendedProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("http://localhost:5001/recommend?username=deshraj")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const allUsers = [];
  //       const individualUser = data.recommended_users;
  //       for (const key in individualUser) {
  //         console.log(individualUser[key]);
  //         const individualUser2 = {
  //           id: key,
  //           ...individualUser[key],
  //         };
  //         allUsers.push(individualUser2);
  //       }
  //       setIsLoading(false);
  //       setRecommendedProfiles(allUsers);
  //     });
  // }, []);

  // if (isLoading) {
  //   return (
  //     <section>
  //       <p>loading...</p>
  //     </section>
  //   );
  // }

  return (
    <div className={classes.basic}>
      <div className={classes.filter}>
          <Filter
            setFilteredProfiles={setFilteredProfiles}
            allProfiles={DUMMY_DATA}
          />
      </div>
      <div className={classes.profiles}>
        <h1>Recommended Profiles for you</h1>
        <motion.div layout>
          <Card>
            <ProfileListMini profiles={filteredProfiles} />
          </Card>
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

export default RecommendedProfilesPage;
