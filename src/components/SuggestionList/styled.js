import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const topLinkStyles = css`
  font-weight: 100;
  font-family: roboto;
  font-size: 24px;
  text-decoration: none;
  position: absolute;
  color: #ccc;
  top: 40px;
  &:hover {
    color: #55c4cd;
  }
`;
export const BackLink = styled(Link)`
  ${topLinkStyles}
  color: #999;
  margin-left: 12px;
`;
export const ShareLink = styled.a`
  ${topLinkStyles}
  font-size: 32px;
  align-self: center;
`;
export const HiddenImg = styled.img`
  max-height: 600px;
  visibility: hidden;
`;
export const Poster = styled.div`
  background: ${({ bgURL }) => `url(${bgURL})`};
  width: ${({width}) => `${width}px`};
`;
export const PosterButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  color: #aaa;
  text-align: center;
  font-family: roboto;
  font-weight: 300;
  font-size: 24px;
  background: rgba(0,0,0,0.7);
  &:hover {
    background: rgba(85, 196, 205, 0.5);
    color: #fff;
  }
  padding: 12px;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
  border: none;
  outline: none;
  cursor: ${({ onWatchlist }) => onWatchlist ? 'not-allowed' : 'pointer' };
`;
export const AddButton = styled(PosterButton)`
  width: ${({ maxWidth }) => `${maxWidth}px`};
  ${'' /* width: ${({ maxWidth }) => `${0.20*maxWidth}px`};
  &:hover {
    width: ${({ maxWidth }) => `${0.80*maxWidth}px`};
  } */}
`;
export const WatchedButton = styled(PosterButton)`
  left: ${({ maxWidth }) => `${0.20*maxWidth}px`};
  width: ${({ maxWidth }) => `${0.80*maxWidth}px`};
  &:hover {
    width: ${({ maxWidth }) => `${0.20*maxWidth}px`};
  }
`;
export const NavLink = styled.a`
  cursor: pointer;
  color: #bbb;
  font-size: 180px;
  font-family: roboto;
  font-weight: 100;
  position: absolute;
  top: 35vh;
`;
export const Watchlist = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-bottom: ${({ numItems }) => numItems>0 ? '-140px' : '0' };
  ${({ overflow }) => !overflow && 'justify-content: center;'}
`;
export const WatchlistBackdrop = styled.h1`
  position: absolute;
  bottom: -32px;
  font-size: 80px;
  font-weight: bold;
  font-family: roboto;
  color: #222;
  z-index: 99;
  letter-spacing: 40px;
`;
export const WatchlistItem = styled.div`
  position: relative;
  z-index: 100;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
`;
export const MovieThumb = styled.img`
  margin-right: 16px;
  margin-top: 20px;
  max-height: 120px;
`;
export const Cross = styled.span`
  border-radius: 50%;
  font-family: roboto;
  font-weight: 500;
  font-size: 12px;
  border: 2px solid #ccc;
  color: #eee;
  position: absolute;
  top: 16px;
  right: 8px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    border-color: #EF5350;
    color: #EF5350;
  }
`;
