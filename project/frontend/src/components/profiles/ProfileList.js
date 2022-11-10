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
        />
      ))}
    </ul>
  );
}

export default ProfileList;
