import classes from "./Modal.module.css";

function Modal(props) {
  return (
    <div className={classes.modal}>
      {/* <button className={classes.close} onClick={props.closeModalHandler}>close Modal</button> */}
      {props.children}
    </div>
  );
}

export default Modal;
