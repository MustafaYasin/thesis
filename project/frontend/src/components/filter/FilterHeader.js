import NavItem from "../layout/NavItem";
import { ReactComponent as ArrowDownIcon } from "../../icons/arrow-down2.svg";
import { ReactComponent as ArrowUpIcon } from "../../icons/arrow-up.svg";
import DropdownMenu from "../layout/DropdownMenu";
import { useState } from "react";
import classes from "./FilterHeader.module.css"
import Tippy from "@tippyjs/react";
import RecommendedProfilesTooltip from "../ui/tooltips/RecommendedProfilesTooltip";
import {Tooltip} from "../store/FeatureTexts"

function FilterHeader(props) {
  const [jobCategory, setJobCategory] = [props.jobCategory, props.setJobCategory];
  const [openDropdown, setOpenDropdown] = useState(false);
 

  return (
    <div className={classes.headerContainer}>
      <NavItem
        open={openDropdown}
        setOpen={setOpenDropdown}
        iconOpen={<ArrowDownIcon />}
        iconClose={<ArrowUpIcon />}
      >
        <DropdownMenu
          setOpen={setOpenDropdown}
          selectJobCategory={props.dropDownClickHandler}
        ></DropdownMenu>
      </NavItem>
      <Tippy content={<RecommendedProfilesTooltip header={Tooltip.selectCategory.header} text={Tooltip.selectCategory.text}></RecommendedProfilesTooltip>}>
      <h1>{jobCategory}</h1>
      </Tippy>
    </div>
  );
}

export default FilterHeader;
