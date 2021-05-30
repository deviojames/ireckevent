import React from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

const ImageBackground = styled(FastImage)`
  justify-content: center;
  align-items: center;

  height: 120px;
  width: 120px;
`;

const Date = styled.Text`
  color: #ffffff;

  font-size: 52px;
  font-weight: 700;
`;

const Month = styled.Text`
  color: #ffffff;

  font-size: 24px;
  font-weight: 500;
`;

const DateOverImage = ({imageUrl, date, month}) => (
  <ImageBackground
    source={{uri: imageUrl}}
    resizeMode={FastImage.resizeMode.contain}>
    <Date>{date}</Date>
    <Month>{month.toUpperCase()}</Month>
  </ImageBackground>
);

export default DateOverImage;
