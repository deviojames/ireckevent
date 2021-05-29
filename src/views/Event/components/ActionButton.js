import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {Button} from '../../../components';

// -- COMPONENTS
const StyledButton = styled(Button)`
  margin-right: 15px;
`;

// -- MAIN
const ActionButton = ({status}) => {
  if (status === 'going') {
    return (
      <StyledButton iconName="done" color="#fdce08">
        Going
      </StyledButton>
    );
  }
  if (status === 'ignore') {
    return (
      <StyledButton iconName="done" color="#833594">
        Ignore
      </StyledButton>
    );
  }
  return (
    <>
      <StyledButton>Going</StyledButton>
      <StyledButton>Ignore</StyledButton>
    </>
  );
};

ActionButton.propTypes = {
  status: PropTypes.string,
};

ActionButton.defaultProps = {
  status: 'none',
};

export default ActionButton;
