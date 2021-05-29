import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

// --COMPONENTS
const Container = styled.View`
  padding: 60px 20px 10px 20px;

  background-color: #ffffff;

  margin-top: 50px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-style: italic;
  font-weight: 900;
`;

const TitleContainer = styled.View`
  position: absolute;
  background-color: #fdce08;

  padding: 10px 15px 10px 15px;
  z-index: 999;

  top: -25px;
`;

// -- MAIN
const EventSection = ({title, children}) => {
  return (
    <Container>
      {title ? (
        <TitleContainer>
          <Title>{title.toUpperCase()}</Title>
        </TitleContainer>
      ) : null}
      {children}
    </Container>
  );
};

EventSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType(PropTypes.element),
};

EventSection.defaultProps = {
  title: '',
  children: null,
};

export default EventSection;
