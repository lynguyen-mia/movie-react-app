import React from "react";
import styles from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={props.isSearch ? styles["modal-search"] : styles.modal}>
      {props.children}
    </div>
  );
};

export default Modal;
