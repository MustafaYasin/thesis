import ProfileItem from "./ProfileItem";
import classes from "./ProfileList.module.css";

function ProfileList(props) {
  return (
    <ul className={classes.list}>
      {props.profiles.map((profile) => (
        <ProfileItem
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
    </ul>
  );
}

export default ProfileList;
