import { MediumPrimaryButton } from "../styles/globalStyle";
import styled from "styled-components";
import rightArrow from "../images/right-arrow.svg";
import { Link } from "react-router-dom";

const CustomMediumPrimaryButton = styled(MediumPrimaryButton)`
  height: 45px;
`;

const HeaderBar = (props) => {
  const {
    categoryName,
    pageName,
    onePage,
    showAdd,
    mainRoute,
    setOpenAddSection,
    openAddSection,
  } = props;

  const multiplePagesHeader = (
    <>
      <p className="category-name">{categoryName}</p>
      <img className="right-arrow-icon" src={rightArrow} />
      <p className="category-page-name">{pageName}</p>
    </>
  );

  const onePageHeader = (
    <p className="category-name" style={{ padding: ".5rem 0" }}>
      {pageName}
    </p>
  );

  return (
    <div className="header-bar">
      <div className="left-header-bar">
        {onePage ? onePageHeader : multiplePagesHeader}
      </div>
      {showAdd && !setOpenAddSection && (
        <Link to={{ pathname: `/${mainRoute}/create` }}>
          <CustomMediumPrimaryButton>
            Add new {categoryName.toLowerCase()}
          </CustomMediumPrimaryButton>
        </Link>
      )}
      {(!openAddSection && setOpenAddSection) && (
        <CustomMediumPrimaryButton onClick={(e) => setOpenAddSection(true)}>
          Add new {categoryName.toLowerCase()}
        </CustomMediumPrimaryButton>
      )}
    </div>
  );
};

export default HeaderBar;
