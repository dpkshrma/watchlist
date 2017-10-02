import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  stroke: #bbb;
  fill: none;
  &:hover {
    stroke: #55c4cd;
  }
  height: 180px;
`;


export const LeftChevron = props => {
  return (
    <SVG version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      viewBox="0 0 14 64" {...props}>
      <polyline id="XMLID_3_" points="13,1 1,32 13,63 "/>
    </SVG>
  );
};

export const RightChevron = props => {
  return (
    <SVG version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      viewBox="0 0 14 64" {...props}>
      <polyline id="XMLID_3_" points="1,1 13,32 1,63 "/>
    </SVG>
  );
};
