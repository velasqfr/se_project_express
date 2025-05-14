import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({ handleCardClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <img src="" alt="" />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection handleCardClick={handleCardClick} />
      </section>
    </div>
  );
}

export default Profile;
