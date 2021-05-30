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
const ActionButton = ({eventId, status, onJoinEvent, onLeaveEvent}) => {
  if (status === 'going') {
    return (
      <ActionContainer>
        <StyledButton iconName="done" color="#fdce08" onPress={onLeaveEvent}>
          Going
        </StyledButton>
      </ActionContainer>
    );
  }
  if (status === 'ignore') {
    return (
      <ActionContainer>
        <StyledButton iconName="clear" color="#c8c7cd" onPress={onJoinEvent}>
          Ignore
        </StyledButton>
      </ActionContainer>
    );
  }
  return (
    <ActionContainer>
      <StyledButton onPress={onJoinEvent}>Going</StyledButton>
      <StyledButton
        onPress={() => onLeaveEvent(eventId)}
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
  onJoinEvent: PropTypes.func,
  onLeaveEvent: PropTypes.func,
};

ActionButton.defaultProps = {
  status: 'none',
  onJoinEvent: () => {},
  onLeaveEvent: () => {},
};

export default ActionButton;
