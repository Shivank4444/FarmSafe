import React from "react";
import Notes from "./Notes";
import './style.css'

export default function Home(props) {
  return (
    <>
      <Notes showAlert={props.showAlert} />
    </>
  );
}
