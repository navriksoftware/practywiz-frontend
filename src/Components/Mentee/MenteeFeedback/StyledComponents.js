import styled from "styled-components";
export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 12000000000;
  background-color: rgba(0, 0, 0, 0.75);
`;
export const Modal = styled.div`
  position: fixed;
  top: 80px;
  left: 5%;
  width: 90%;
  height: 500px;
  background-color: white;
  overflow: scroll;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 100000;
  animation: slide-down 300ms ease-out forwards;
  @media (min-width: 768px) {
    width: 40rem;
    left: calc(50% - 20rem);
  }

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
export const CloseButtonDiv = styled.div`
  height: 30px;
  width: 30px;
  position: absolute;
  top: 14px;
  right: 16px;
  cursor: pointer;
`;
export const ConfirmBookingTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  margin-bottom: 0.5rem;
`;
export const MentorBoxDiv = styled.div`
  width: 100%;
  margin: 0 auto;
`;
export const MentorSessionName = styled.p`
  font-size: 16px;
  padding-bottom: 8px;
  margin: 0px;
  span {
    font-weight: 600;
    color: #077f7f;
    font-size: 19px;
    text-transform: capitalize;
  }
`;
export const MentorBookedDate = styled.p`
  margin: 0px;
  span {
    margin: 0 10px;
    color: gray;
  }
  padding-bottom: 8px;
`;
