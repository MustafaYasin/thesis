import classes from "./NavItem.module.css";

function NavItem(props) {
    const [open, setOpen]=[props.open, props.setOpen];
  return (
    <li className={classes.navItem}>
      {!open && <a href="#" className={classes.iconButton} onClick={()=>setOpen(!open)}>
        {props.iconOpen}
      </a>}
      {open && <a href="#" className={classes.iconButton} onClick={()=>setOpen(!open)}>
        {props.iconClose}
      </a>}
      {open && props.children }
    </li>
  );
}

export default NavItem;
