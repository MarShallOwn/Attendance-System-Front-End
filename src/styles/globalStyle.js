import styled from "styled-components";
import colors from "./colors";
import sizes from "./sizes";

// Buttons
const Button = styled.button`
  transition: 0.5s;
  border-radius: 10px;
  font-size: ${sizes.BODY};
`;

const PrimaryButton = styled(Button)`
  color: ${colors.WHITE};
  border: none;
  background: ${colors.PRIMARY} 0% 0% no-repeat padding-box;
  :hover {
    background-color: ${colors.HOVER_PRIMARY};
  }
`;
const SecondaryButton = styled(Button)`
  border: none;
  color: ${colors.PRIMARY};
  background: ${colors.SECONDARY} 0% 0% no-repeat padding-box;
  :hover {
    background-color: ${colors.HOVER_SECONDARY};
    border: 1px solid ${colors.PRIMARY};
  }
`;

export const LargePrimaryButton = styled(PrimaryButton)`
  top: 749px;
  left: 37px;
  width: 343px;
  height: 55px;
`;

export const MediumPrimaryButton = styled(PrimaryButton)`
  top: 749px;
  left: 413px;
  width: 180px;
  height: 55px;
`;

export const SmallPrimaryButton = styled(PrimaryButton)`
  top: 754px;
  left: 650px;
  width: 125px;
  height: 45px;
  font-size: ${sizes.SMALLER};
`;
export const LargeSecondaryButton = styled(SecondaryButton)`
  top: 749px;
  left: 37px;
  width: 343px;
  height: 55px;
`;
export const MediumSecondaryButton = styled(SecondaryButton)`
  top: 749px;
  left: 413px;
  width: 180px;
  height: 55px;
`;

export const SmallSecondaryButton = styled(SecondaryButton)`
  top: 754px;
  left: 650px;
  width: 125px;
  height: 45px;
  font-size: ${sizes.SMALLER};
`;

// Fields

export const Input = styled.input`
  top: 295px;
  left: 516px;
  height: 55px;
  display: block;
  font-size: ${sizes.BODY};
  background: ${colors.WHITE} 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.BORDER_FIELD};
  border-radius: 5px;
`;
