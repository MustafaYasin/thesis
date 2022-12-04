import classes from "./DropdownMenu.module.css";
import { ReactComponent as ComputerVisionIcon } from "../../icons/computer-vision.svg";
import { ReactComponent as HealthAiIcon } from "../../icons/health-ai.svg";
import { ReactComponent as DataScienceIcon } from "../../icons/data-science.svg";
import job from "../store/JobCategories.js";

function DropdownMenu(props) {
  function onDataScience() {
    props.setOpen(false);
    props.selectJobCategory(job.dataScience);
  }
  function onMedicalAI() {
    props.setOpen(false);
    props.selectJobCategory(job.medicalAi);
  }
  function onComputerVision() {
    props.setOpen(false);
    props.selectJobCategory(job.computerVision);
  }

  function DropdownItem(props) {
    return (
      <div>
        <p className={classes.menuItem}>
          {props.children}
          <span className={classes.iconRight}>{props.rightIcon}</span>
        </p>
      </div>
    );
  }

  return (
    <div className={classes.dropdown}>
      <div onClick={onDataScience}>
        <DropdownItem rightIcon={<DataScienceIcon />}>
          {job.dataScience}
        </DropdownItem>
      </div>
      <div onClick={onMedicalAI}>
        <DropdownItem rightIcon={<HealthAiIcon />}>
          {job.medicalAi}
        </DropdownItem>
      </div>
      <div onClick={onComputerVision}>
        <DropdownItem rightIcon={<ComputerVisionIcon />}>
          {job.computerVision}
        </DropdownItem>
      </div>
    </div>
  );
}

export default DropdownMenu;
