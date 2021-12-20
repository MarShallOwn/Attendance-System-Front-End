import { MediumPrimaryButton } from "../styles/globalStyle";
import styled from "styled-components";
import rightArrow from "../images/right-arrow.svg";
import { Link } from "react-router-dom";

const CustomMediumPrimaryButton = styled(MediumPrimaryButton)`
  height: 45px;
`;

const HeaderBar = (props) => {
  const { categoryName, pageName } = props;


  return (
    <div className="header-bar">
      <div className="left-header-bar">
        <p className="category-name">{categoryName}</p>
        <img className="right-arrow-icon" src={rightArrow} />
        <p className="category-page-name">{pageName}</p>
      </div>
      {pageName.includes("List") && (
        <Link to={{ pathname: `/${categoryName.toLowerCase()}/create` }}>
          <CustomMediumPrimaryButton>
            Add new {categoryName.toLowerCase()}
          </CustomMediumPrimaryButton>
        </Link>
      )}
    </div>
  );
};

export default HeaderBar;
