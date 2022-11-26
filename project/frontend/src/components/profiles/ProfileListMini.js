import ProfileItemMini from "./ProfileItemMini";
import classes from "./ProfileListMini.module.css";
import { AnimatePresence } from "framer-motion";

function ProfileListMini(props) {
  return (
    <div className={classes.listContainer}>
      <ul>
        <AnimatePresence>
          <div className={classes.list}>
            {props.profiles.map((profile) => (
              <ProfileItemMini
                key={profile.email}
                id={profile.email}
                email={profile.email}
                avatar_url={profile.avatar_url}
                isHireable={profile.isHireable}
                fullName={profile.fullName}
                repository_count={profile.repository_count}
                star_time={profile.star_time}
                username={profile.username}
                recommendations={profile.recommendations}
                bio={profile.bio}
                company={profile.company}
                primary_language={profile.primary_language}
                yearsofExperience={profile.yearsofExperience}
                feature_1={profile.feature_1}
                feature_2={profile.feature_2}
                feature_3={profile.feature_3}
                feature1Factor={props.feature1Factor}
                feature2Factor={props.feature2Factor}
                feature3Factor={props.feature3Factor}
              />
            ))}
          </div>
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default ProfileListMini;
