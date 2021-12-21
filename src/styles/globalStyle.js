import styled from "styled-components";

// Buttons
const Button = styled.button`
  transition: 0.5s;
  border-radius: 10px;
  font-size: var(--body-size);
`;

const PrimaryButton = styled(Button)`
  color: var(--white-color);
  border: none;
  background: var(--primary-color) 0% 0% no-repeat padding-box;
  :hover {
    background-color: var(--hover-primary-color);
  }
`;
const SecondaryButton = styled(Button)`
  border: none;
  color: var(--primary-color);
  background: var(--secondary-color) 0% 0% no-repeat padding-box;
  :hover {
    background-color: var(--hover-secondary-color);
    border: 1px solid var(--primary-color);
  }
`;

const DeleteButton = styled(Button)`
  border: none;
  color: var(--inactive-color);
  background: var(--secondary-color) 0% 0% no-repeat padding-box;
  :hover {
    color: var(--white-color);
    background-color: var(--inactive-color);
    border: 1px solid var(--inactive-color);
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
  font-size: var(--smaller-size);
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
  font-size: var(--smaller-size);
`;

export const MediumDeleteButton = styled(DeleteButton)`
  top: 749px;
  left: 413px;
  width: 180px;
  height: 55px;
`;

// Fields

export const Input = styled.input`
  top: 295px;
  left: 516px;
  height: 55px;
  display: block;
  font-size: var(--body-size);
  background: var(--white-color) 0% 0% no-repeat padding-box;
  border: 1px solid var(--border-field-color);
  border-radius: 5px;
`;

// Search Input

export const SearchDiv = styled.div`
  top: 21px;
  left: 287px;
  border: none;
  background: var(--search-background-color) 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  top: 21px;
  left: 287px;
  height: 45px;
  border: none;
  font-weight: var(--medium-weight);
  background: var(--search-background-color) 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;
  font-size: var(--body-size);

  :focus {
    outline: none;
  }
`;

const IconImg = styled.img`
  margin-left: 1.3rem;
  margin-right: 0.5rem;
`;

export const InputWithIcon = ({ icon, width, ...props }) => {
  return (
    <SearchDiv>
      <IconImg src={icon} />
      <SearchInput style={{ width }} {...props} />
    </SearchDiv>
  );
};
