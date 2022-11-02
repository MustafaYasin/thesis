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

const DUMMY_DATA = [
  {
    email: "dsoller@outlook.com",
    avatar:
      "https://avatars.githubusercontent.com/u/5482320?u=c2d4799ecd5e827076eca00cbd635b2720013685&v=4",
    Hireable: true,
    Name: "David R Soller",
    repos: 36,
    starredTime: "2017-01-20 06:26:19",
    Username: "3ygun",
    recommendations: 3.89010989010989,
  },
  {
    email: "linyiyu1992@gmail.com",
    avatar: "https://avatars.githubusercontent.com/u/3176481?v=4",
    Hireable: true,
    Name: "Yiyu Lin",
    repos: 36,
    starredTime: "2017-01-22 08:30:39",
    Username: "attila-lin",
    recommendations: 1.889010989010989,
  },
  {
    email: "_@hideyukisaito.info",
    avatar:
      "https://avatars.githubusercontent.com/u/802921?u=e55932ec4f1df9f77bb34c25252e5fd39a407550&v=4",
    Hireable: false,
    Name: "Hideyuki Saito",
    repos: 36,
    starredTime: "2017-03-16 18:04:06",
    Username: "hideyukisaito",
    recommendations: 6.89010989010989,
  },
  {
    email: "lg342@cornell.edu",
    avatar:
      "https://avatars.githubusercontent.com/u/62580?u=45ada638ed6b28729624313ecfac10b1c76fad4c&v=4",
    Hireable: true,
    Name: "Lee Gao",
    repos: 35,
    starredTime: "2017-01-18 19:33:19",
    Username: "leegao",
    recommendations: 9.615384615384617,
  },
];

function RecommendedProfilesPage() {
  const detailsCtx = useContext(DetailsContext);
  const [recommendedProfiles, setRecommendedProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);

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
        console.log("--------------------------");
        console.log(allUsers);
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
    <div className={classes.basic}>
      <div className={classes.filter}>
        <h1>Filter</h1>
        <Card>
          <Filter
            setFilteredProfiles={setFilteredProfiles}
            allProfiles={recommendedProfiles}
          />
        </Card>
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
