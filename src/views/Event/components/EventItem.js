import PropTypes from 'prop-types';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';
import moment from 'moment';
import DateOverImage from './DateOverImage';
import {date, url} from '../../../utils';
import ActionButton from './ActionButton';

// -- COMPONENTS
const Container = styled.View`
  flex-direction: row;
  margin-bottom: 25px;
`;

const InfoContainer = styled.View`
  padding-left: 20px;
  flex: 1;
`;

const AttendeesContainer = styled.View`
  flex: 1;
  flex-direction: row;

  align-items: center;
  margin-left: 10px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

const ExtraAttendees = styled.Text`
  font-size: 16px;
  font-weight: 500;

  margin-left: 5px;
`;

const DateTimeText = styled.Text`
  font-size: 14px;
`;

const Avatar = styled(FastImage)`
  width: 35px;
  height: 35px;

  margin-left: -10px;

  border-radius: 999px;
  border-width: 2px;
  border-color: #ffffff;
`;

// -- MAIN
const EventItem = ({
  eventData,
  onPressEventItem,
  onJoinEvent,
  onLeaveEvent,
}) => {
  const {id, title, dateTime, image, members, status} = eventData;

  return (
    <TouchableOpacity onPress={() => onPressEventItem()}>
      <Container>
        <DateOverImage
          imageUrl={url.protocolPrefix(image)}
          date={moment(dateTime).format('DD')}
          month={moment(dateTime).format('MMM[.]')}
        />
        <InfoContainer>
          <Title numberOfLines={1}>{title.toUpperCase()}</Title>
          <DateTimeText>{date.calendarFormat(moment(dateTime))}</DateTimeText>
          <AttendeesContainer>
            {members.slice(0, 3).map(member => {
              return (
                <Avatar
                  source={{
                    uri: url.protocolPrefix(member.photo),
                    priority: FastImage.priority.normal,
                  }}
                  key={`member-${title}-${member.id}`}
                  resizeMode={FastImage.resizeMode.contain}
                />
              );
            })}
            {members.length > 3 ? (
              <ExtraAttendees>+{members.length - 3} others</ExtraAttendees>
            ) : null}
          </AttendeesContainer>
          <ActionButton
            status={status}
            onJoinEvent={() => onJoinEvent(id)}
            onLeaveEvent={() => onLeaveEvent(id)}
          />
        </InfoContainer>
      </Container>
    </TouchableOpacity>
  );
};

EventItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  dateTime: PropTypes.string,
  image: PropTypes.string,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.id,
      photo: PropTypes.string,
    }),
  ),
  status: PropTypes.string,
  onPressEventItem: PropTypes.func,
  onJoinEvent: PropTypes.func,
  onLeaveEvent: PropTypes.func,
};

EventItem.defaultProps = {
  id: null,
  title: '',
  dateTime: '',
  image: '',
  members: [],
  status: 'none',
  onPressEventItem: () => {},
  onJoinEvent: () => {},
  onLeaveEvent: () => {},
};

export default EventItem;
