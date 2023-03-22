import styles from "./About.module.css";
import foto from "../../utils/foto henry.jpg";

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.textBox}>
        <h2 className={styles.tittle}>About me</h2>
        <p className={styles.words}>
          Hi! my name is Valentin Dealbera, im a musician, programmer and passionate gamer all through my Life
          i started programming in 2023 after a friend recommend "SoyHenry" to me, since then, programming was 
          a kind of dark magic to me, but now im trying my best to get more into programming as i can.
          my dream job is to work for a music software business like Streinberg or Native instruments, and also
          to start working as a game developer for those are my two greatest passions in life. i love to interact
          with people and be connected, being a social being is one of my greatest skills, im really patient and calm,
          its really exiting to start in the T.I bussiness, and starting to do this "dark magic" that i used to think
          it was!
        </p>
        <img className={styles.img} src={foto} alt="Valentin Dealbera" />
      </div>
    </div>
  );
};

export default About;
