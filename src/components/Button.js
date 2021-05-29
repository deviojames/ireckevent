import PropTypes from 'prop-types';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

// -- COMPONENTS
const ButtonContainer = styled(TouchableOpacity)`
  background-color: ${props => props.color};

  padding: 5px 10px 5px 10px;

  justify-content: center;
  align-items: center;

  overflow: hidden;
  /* overwrite style */
  ${props => props.styled || ''}
`;

const ButtonContent = styled.View`
  flex-direction: row;
  align-items: center;

  /* overwrite style */
  ${props => props.styled || ''}
`;

const ButtonText = styled.Text`
  font-weight: 500;
`;

const ButtonIcon = styled(Icon)`
  margin-right: 5px;
`;

// -- MAIN
const Button = ({children, iconName, color, ...buttonProps}) => {
  return (
    <ButtonContainer {...buttonProps} color={color}>
      <ButtonContent>
        {iconName ? <ButtonIcon name={iconName} size={18} /> : null}
        <ButtonText>{children}</ButtonText>
      </ButtonContent>
    </ButtonContainer>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  iconName: PropTypes.string,
  color: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  iconName: null,
  color: '#c8c7cd',
};

export default Button;
