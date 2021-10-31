import styles from "./styles.module.css";
import Select from "./Select";
import Days from "./Days";

export default function Container() {
  return (
    <div className={styles.weatherContainer}>
      <Select />
      <Days />
    </div>
  );
}
