import React from "react";

type Props = {
  func: Function;
  title: string;
};

function Button(props: Props) {
  return <button className="btn" onClick={() => props.func()}>{props.title}</button>;
}

export default Button;
