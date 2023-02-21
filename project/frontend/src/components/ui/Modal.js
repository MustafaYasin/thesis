import classes from "./Modal.module.css";

function Modal(props) {
  return (
    <div className={classes.modal}>
      <div className={classes.outer}>
        {/* <button className={classes.close} onClick={props.closeModalHandler}>close Modal</button> */}
        {props.children}

        <div className={classes.close}>
          <button className={classes.closeButton} onClick={props.closeModalHandler}>X</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
