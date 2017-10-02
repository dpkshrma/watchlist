import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  stroke: #bbb;
  fill: none;
  &:hover {
    stroke: #55c4cd;
  }
`;

const PlayIcon = ({ circleProps, triangleProps, ...restProps }) => {
  return (
    <SVG version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px"
      y="0px" viewBox="0 0 100 100" {...restProps}>
      <circle id="XMLID_1_" className="st0" cx="50" cy="50" r="49" strokeWidth="2" {...circleProps} />
      <polygon id="XMLID_2_" className="st0" points="33.7,24 78.7,50 33.7,76 " strokeWidth="2" {...triangleProps} />
    </SVG>
  );
};

export default PlayIcon;
