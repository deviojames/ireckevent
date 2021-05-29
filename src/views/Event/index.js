import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {fetchEvent, selectEventData} from '../../redux/slices/eventSlice';
import {check} from '../../utils';
import EventItem from './components/EventItem';
import EventSection from './components/EventSection';

// -- COMPONENTS
const StyledScrollView = styled(ScrollView)`
  background-color: #f5f5f5;
`;

const Event = () => {
  const dispatch = useDispatch();
  const eventData = useSelector(selectEventData);

  useEffect(() => {
    dispatch(fetchEvent());
  }, [dispatch]);

  return (
    <StyledScrollView>
      {!check.isArrayEmpty(eventData?.today) ? (
        <EventSection title="today">
          {eventData?.today?.map(event => {
            return (
              <EventItem key={`${event.title}-${event.id}`} eventData={event} />
            );
          })}
        </EventSection>
      ) : null}
      {!check.isArrayEmpty(eventData?.week) ? (
        <EventSection title="this week">
          {eventData?.week?.map(event => {
            return (
              <EventItem key={`${event.title}-${event.id}`} eventData={event} />
            );
          })}
        </EventSection>
      ) : null}
      {!check.isArrayEmpty(eventData?.later) ? (
        <EventSection title="later">
          {eventData?.later?.map(event => {
            return (
              <EventItem key={`${event.title}-${event.id}`} eventData={event} />
            );
          })}
        </EventSection>
      ) : null}
    </StyledScrollView>
  );
};

export default Event;
