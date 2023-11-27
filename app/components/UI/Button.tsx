import React from "react";

type Props = {
  func: Function;
  title: string;
};

function Button(props: Props) {
  return <button className="py-2 px-4 border-black border-2 rounded-lg" onClick={() => props.func()}>{props.title}</button>;
}

export default Button;
