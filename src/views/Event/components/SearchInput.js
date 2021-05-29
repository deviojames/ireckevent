import React from 'react';
import {TextInput} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

// -- COMPONENTS
const Container = styled.View`
  margin: 5px 25px 0px 25px;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: #fbfbfb;

  border-radius: 5px;
`;

const StyledIcon = styled(Icon)`
  padding: 6px;
`;

// -- MAIN
const SearchInput = ({textHandler}) => {
  const [text, setText] = textHandler;
  return (
    <Container>
      <StyledIcon name="search" size={20} color="#6e6e6e" />
      <TextInput
        placeholder="Search event"
        onChangeText={t => {
          setText(t);
        }}
        value={text}
        underlineColorAndroid="transparent"
      />
    </Container>
  );
};

export default SearchInput;
