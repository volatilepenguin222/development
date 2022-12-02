import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "@emotion/styled";

export class Radio extends Component {
  state = {};

  render() {
    const { selected, onChange, text, value } = this.props;
    const buttonSelected = selected === value;
    return (
      <div
        className="radio-container"
        onClick={() => {
          onChange(value);
        }}
      >
        <OptionButtons selected={buttonSelected}></OptionButtons>
        {/* <div className={`radio-circle ${value !== selected && "unselected-circle"}`} /> */}
        <div>{text}</div>
      </div>
    );
  }
}

const OptionButtons = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  border-width: 0px;
  background-color: ${(props) => (props.selected ? "#82c6e3" : "#88d0ef")};
  box-shadow: ${(props) =>
    props.selected
      ? "inset 0px 3px 5px 0px rgb(103, 128, 134)"
      : "inset 0px 0px 0px 0px"};
  filter: ${(props) =>
    props.selected
      ? "drop-shadow(0px 0px 0px)"
      : "drop-shadow(0px 2.5px 2.5px rgb(103, 128, 134))"};
  margin: 5px;
  align-self: center;
`;

Radio.propTypes = {
  text: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
