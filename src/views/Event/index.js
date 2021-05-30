import React, {useEffect, useState, useCallback} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import {
  fetchEvent,
  fetchJoinEvent,
  fetchLeaveEvent,
  selectEventData,
  selectEventDataStatus,
} from '../../redux/slices/eventSlice';
import {check} from '../../utils';
import EventItem from './components/EventItem';
import EventSection from './components/EventSection';
import SearchInput from './components/SearchInput';

moment.locale('en', {
  week: {
    dow: 1, // set Monday is the first day of the week.
  },
});

// -- COMPONENTS
const StyledScrollView = styled(ScrollView)`
  background-color: #f5f5f5;
`;

const NoEventContainer = styled.View`
  align-items: center;
`;

const NoEventText = styled.Text``;

const Event = ({navigation}) => {
  const dispatch = useDispatch();
  const eventData = useSelector(selectEventData);
  const eventDataStatus = useSelector(selectEventDataStatus);

  const [text, setText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [searchEventData, setSearchEventData] = useState([]);
  const [eventDataOnToday, setEventDataOnToday] = useState([]);
  const [eventDataOnThisWeek, setEventDataOnThisWeek] = useState([]);
  const [eventDataOnLater, setEventDataOnLater] = useState([]);

  useEffect(() => {
    dispatch(fetchEvent());
  }, [dispatch]);

  useEffect(() => {
    if (!check.isArrayEmpty(eventData)) {
      const filteredDataOnToday = eventData?.filter(event =>
        moment(event.dateTime).isSame(moment(), 'day'),
      );

      const filteredDataOnThisWeek = eventData?.filter(
        event =>
          moment(event.dateTime).isSame(moment(), 'week') &&
          moment(event.dateTime).isSame(moment(), 'day') === false,
      );
      const filteredDataOnLater = eventData?.filter(
        event =>
          moment(event.dateTime).isSame(moment(), 'day') === false &&
          moment(event.dateTime).isSame(moment(), 'week') === false,
      );

      setEventDataOnToday(filteredDataOnToday);
      setEventDataOnThisWeek(filteredDataOnThisWeek);
      setEventDataOnLater(filteredDataOnLater);
    }
  }, [eventData]);

  useEffect(() => {
    const filteredSearchEvent = eventData?.filter(event =>
      event.title.toLowerCase().includes(text.toLowerCase()),
    );
    setSearchEventData(filteredSearchEvent);
  }, [eventData, text]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchEvent());
    if (eventDataStatus === 'succeeded') {
      setRefreshing(false);
    }
  }, [dispatch, eventDataStatus]);

  function onJoinEvent(eventId) {
    dispatch(fetchJoinEvent({eventId}));
  }

  function onLeaveEvent(eventId) {
    dispatch(fetchLeaveEvent({eventId}));
  }

  return (
    <>
      <SearchInput textHandler={[text, setText]} />
      {text === '' ? (
        <StyledScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {!check.isArrayEmpty(eventDataOnToday) ? (
            <EventSection title="today">
              {eventDataOnToday?.map(event => {
                return (
                  <EventItem
                    key={`${event.title}-${event.id}`}
                    eventData={event}
                    onPressEventItem={() =>
                      navigation.navigate('eventDetail', {
                        eventId: event.id,
                        title: event.title,
                      })
                    }
                    onJoinEvent={onJoinEvent}
                    onLeaveEvent={onLeaveEvent}
                  />
                );
              })}
            </EventSection>
          ) : null}
          {!check.isArrayEmpty(eventDataOnThisWeek) ? (
            <EventSection title="this week">
              {eventDataOnThisWeek?.map(event => {
                return (
                  <EventItem
                    key={`${event.title}-${event.id}`}
                    eventData={event}
                    onPressEventItem={() =>
                      navigation.navigate('eventDetail', {
                        eventId: event.id,
                        title: event.title,
                      })
                    }
                    onJoinEvent={onJoinEvent}
                    onLeaveEvent={onLeaveEvent}
                  />
                );
              })}
            </EventSection>
          ) : null}
          {!check.isArrayEmpty(eventDataOnLater) ? (
            <EventSection title="later">
              {eventDataOnLater?.map(event => {
                return (
                  <EventItem
                    key={`${event.title}-${event.id}`}
                    eventData={event}
                    onPressEventItem={() =>
                      navigation.navigate('eventDetail', {
                        eventId: event.id,
                        title: event.title,
                      })
                    }
                    onJoinEvent={onJoinEvent}
                    onLeaveEvent={onLeaveEvent}
                  />
                );
              })}
            </EventSection>
          ) : null}
        </StyledScrollView>
      ) : (
        <StyledScrollView>
          <EventSection title="search">
            {searchEventData.length === 0 ? (
              <NoEventContainer>
                <NoEventText>No events with this name.</NoEventText>
              </NoEventContainer>
            ) : null}
            {searchEventData?.map(event => {
              return (
                <EventItem
                  key={`${event.title}-${event.id}`}
                  eventData={event}
                  onPressEventItem={() =>
                    navigation.navigate('eventDetail', {
                      eventId: event.id,
                      title: event.title,
                    })
                  }
                  onJoinEvent={onJoinEvent}
                  onLeaveEvent={onLeaveEvent}
                />
              );
            })}
          </EventSection>
        </StyledScrollView>
      )}
    </>
  );
};

export default Event;
