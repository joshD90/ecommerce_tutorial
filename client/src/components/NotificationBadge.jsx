import React from "react";
import styled from "styled-components";

const MyBadge = styled.div`
  background-color: red;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  font-size: 10px;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  right: -3px;
  top: -5px;
`;

const BadgeContainer = styled.div`
  position: relative;
  overflow: visible;
  display: flex;
`;

const NotificationBadge = ({ materialUI, notifcationNumber }) => {
  return (
    <BadgeContainer>
      {materialUI}
      {notifcationNumber !== "0" && <MyBadge>{notifcationNumber}</MyBadge>}
    </BadgeContainer>
  );
};

export default NotificationBadge;
