import React from 'react';
import {ImageBackground, Text} from 'react-native';
import styled from 'styled-components';

const Background = styled(ImageBackground).attrs({
  resizeMode: 'cover',
})`
  justify-content: center;
  align-items: center;

  height: 120px;
  width: 120px;
`;

const Date = styled(Text)`
  color: #ffffff;

  font-size: 52px;
  font-weight: 700;
`;

const Month = styled(Text)`
  color: #ffffff;

  font-size: 24px;
  font-weight: 500;
`;

const DateOverImage = ({imageUrl, date, month}) => (
  <Background source={{uri: imageUrl}}>
    <Date>{date}</Date>
    <Month>{month.toUpperCase()}</Month>
  </Background>
);

export default DateOverImage;
