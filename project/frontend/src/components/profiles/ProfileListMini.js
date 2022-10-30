import ProfileItemMini from "./ProfileItemMini";
import classes from "./ProfileListMini.module.css";
import { AnimatePresence } from "framer-motion";

function ProfileListMini(props) {
  return (
    <>
      <p className={classes.heading}>People you may want to hire?</p>
      <ul className={classes.list}>
        <AnimatePresence>
          {props.profiles.map((profile) => (
            <ProfileItemMini
              key={profile.email}
              id={profile.email}
              email={profile.email}
              avatar_url={profile.avatar_url}
              hireable={profile.hireable}
              fullName={profile.fullName}
              repo_count={profile.repo_count}
              star_time={profile.star_time}
              username={profile.username}
              recommendations={profile.recommendations}
            />
          ))}
        </AnimatePresence>
      </ul>

    </>
  );
}

export default ProfileListMini;
