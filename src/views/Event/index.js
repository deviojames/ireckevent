import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {fetchEvent, selectEventData} from '../../redux/slices/eventSlice';
import {check} from '../../utils';
import EventItem from './components/EventItem';
import EventSection from './components/EventSection';
import SearchInput from './components/SearchInput';

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

  const [text, setText] = useState('');
  const [searchEventData, setSearchEventData] = useState([]);

  useEffect(() => {
    dispatch(fetchEvent());
  }, [dispatch]);

  useEffect(() => {
    const filteredSearchEvent = eventData?.all?.filter(event =>
      event.title.toLowerCase().includes(text.toLowerCase()),
    );
    setSearchEventData(filteredSearchEvent);
  }, [eventData?.all, text]);

  return (
    <>
      <SearchInput textHandler={[text, setText]} />
      {text === '' ? (
        <StyledScrollView>
          {!check.isArrayEmpty(eventData?.today) ? (
            <EventSection title="today">
              {eventData?.today?.map(event => {
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
                  />
                );
              })}
            </EventSection>
          ) : null}
          {!check.isArrayEmpty(eventData?.week) ? (
            <EventSection title="this week">
              {eventData?.week?.map(event => {
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
                  />
                );
              })}
            </EventSection>
          ) : null}
          {!check.isArrayEmpty(eventData?.later) ? (
            <EventSection title="later">
              {eventData?.later?.map(event => {
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
