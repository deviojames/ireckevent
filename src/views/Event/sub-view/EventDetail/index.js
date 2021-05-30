import React, {useEffect} from 'react';
import styled from 'styled-components';
import {ScrollView, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {
  fetchJoinEvent,
  fetchLeaveEvent,
  fetchSelectedEvent,
  selectSelectedEventData,
  selectSelectedEventDataStatus,
} from '../../../../redux/slices/eventSlice';
import {url} from '../../../../utils';
import moment from 'moment';
import ActionButton from '../../components/ActionButton';

// -- COMPONENTS
const Container = styled(ScrollView)`
  flex: 1;
`;

const EventTitle = styled.Text`
  font-size: 24px;
`;

const Title = styled.Text`
  font-size: 24px;
`;

const DateTime = styled.Text`
  font-size: 14px;
`;

const Description = styled.Text`
  font-size: 16px;
`;

const EventImage = styled(FastImage)`
  width: 100%;
  height: 300px;
`;

const TitleContainer = styled.View`
  background-color: #ffffff;
  padding: 5px;

  border-radius: 10px;
`;

const Content = styled.View`
  padding: 10px;
`;

const DescriptionContainer = styled.View`
  background-color: #ffffff;

  margin-top: 10px;
  padding: 5px;

  border-radius: 10px;
`;

const ActionButtonContainer = styled.View`
  align-items: flex-start;
`;

// -- MAIN

const EventDetail = ({route}) => {
  const {eventId} = route.params;
  const dispatch = useDispatch();
  const selectedEventData = useSelector(selectSelectedEventData);
  const selectedEventDataStatus = useSelector(selectSelectedEventDataStatus);

  useEffect(() => {
    dispatch(fetchSelectedEvent({eventId: eventId}));
  }, [dispatch, eventId]);

  function onJoinEvent() {
    dispatch(fetchJoinEvent({eventId}));
  }

  function onLeaveEvent(id) {
    dispatch(fetchLeaveEvent({eventId}));
  }

  const {title, image, description, dateTime, status} = selectedEventData;

  if (selectedEventDataStatus === 'loading') {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Container>
      {image ? (
        <EventImage
          source={{
            uri: url.protocolPrefix(image),
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      ) : null}
      <Content>
        <TitleContainer>
          <EventTitle>{title}</EventTitle>
          <DateTime>{moment(dateTime).format('DD MMM YY hh:mm A')}</DateTime>
          <ActionButtonContainer>
            <ActionButton
              status={status}
              onJoinEvent={onJoinEvent}
              onLeaveEvent={onLeaveEvent}
            />
          </ActionButtonContainer>
        </TitleContainer>
        <DescriptionContainer>
          <Title>Description</Title>
          <Description>{description}</Description>
        </DescriptionContainer>
      </Content>
    </Container>
  );
};

export default EventDetail;
