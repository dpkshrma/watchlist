export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  color: #bbb;
`;
export const Form = styled.form`
  margin-top: -160px;
  text-align: center;
  line-height: 2;
`;
export const MultiSelect = styled(Select)`
  line-height: 1;
  &.Select {
    outline: none;
    display: inline-flex;
    font-size: 40px;
    font-weight: 100;
    font-family: roboto;
    border: none;
    min-width: 200px;
  }
  & .Select-control {
    border: none;
    border-bottom: 1px solid #55c4cd;
    border-radius: 0;
    overflow: visible;
    background: transparent;
  }
  & .Select-clear-zone {
    display: none;
  }
  & .Select-arrow-zone {
    display: none;
  }
  &.is-focused:not(.is-open) > .Select-control {
    border: none;
    border-bottom: 1px solid #55c4cd;
    box-shadow: none;
  }
  & .Select-value {
    padding-right: 10px !important;
    position: relative !important;
    overflow: visible !important;
  }
  & .Select-value-label {
    color: #bbb !important;
  }
  & .Select-input {
    display: none !important;
  }
`;
export const Label = styled.div`
  font-weight: 100;
  font-size: 32px;
  font-family: roboto;
  color: #999;
`;
export const Text = styled.span`
  font-weight: 100;
  font-size: 48px;
  font-family: roboto;
`;
export const Icon = styled.i`
  cursor: pointer;
`;
