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
              image={profile.avatar}
              hireable={profile.Hireable}
              fullName={profile.Name}
              repos={profile.repos}
              starredTime={profile.starredTime}
              username={profile.Username}
              recommendations={profile.recommendations}
            />
          ))}
        </AnimatePresence>
      </ul>

    </>
  );
}

export default ProfileListMini;
