import PropTypes from 'prop-types';
import React from 'react';
import styled, {css} from 'styled-components';
import {Button} from '../../../components';

// -- COMPONENTS
const StyledButton = styled(Button)`
  ${props => props.styled || ''}
`;

const ActionContainer = styled.View`
  flex-direction: row;

  justify-content: flex-start;
`;

// -- MAIN
const ActionButton = ({status}) => {
  if (status === 'going') {
    return (
      <ActionContainer>
        <StyledButton iconName="done" color="#fdce08">
          Going
        </StyledButton>
      </ActionContainer>
    );
  }
  if (status === 'ignore') {
    return (
      <ActionContainer>
        <StyledButton iconName="done" color="#833594">
          Ignore
        </StyledButton>
      </ActionContainer>
    );
  }
  return (
    <ActionContainer>
      <StyledButton>Going</StyledButton>
      <StyledButton
        styled={css`
          margin-left: 10px;
        `}>
        Ignore
      </StyledButton>
    </ActionContainer>
  );
};

ActionButton.propTypes = {
  status: PropTypes.string,
};

ActionButton.defaultProps = {
  status: 'none',
};

export default ActionButton;
