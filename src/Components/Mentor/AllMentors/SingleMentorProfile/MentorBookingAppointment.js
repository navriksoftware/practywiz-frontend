import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import logo from "../../../../Images/logo.png";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux.js";
import { ApiURL } from "../../../../Utils/ApiURL.js";
import { MentorFormOptions } from "../../../data/MentorFormOptions.js";
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 12000000000;
  background-color: rgba(0, 0, 0, 0.75);
`;
const Modal = styled.div`
  position: fixed;
  top: 100px;
  left: 5%;
  width: 90%;
  height: auto;
  background-color: white;
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

const CloseButtonDiv = styled.div`
  height: 30px;
  width: 30px;
  position: absolute;
  top: 14px;
  right: 16px;
  cursor: pointer;
`;
const ConfirmBookingTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  margin-bottom: 0.5rem;
`;
const MentorBoxDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 10px;
`;
const MentorSessionName = styled.p`
  font-size: 15px;
  padding-bottom: 8px;
  margin: 0px;
  span {
    font-weight: 600;
    color: #077f7f;
    font-size: 19px;
    text-transform: capitalize;
  }
`;
const MentorBookedDate = styled.p`
  margin: 0px;
  span {
    margin: 0 10px;
    color: gray;
  }
  padding-bottom: 8px;
`;
const ConfirmButton = styled.button`
  margin: 0 auto;
  width: 100%;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.5s ease-in-out;
  background-color: #2dbedb;
  &:hover {
    background-color: #0255ca;
  }
`;
const FormSelect = styled.select`
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  padding: 5px 10px;
  &:focus {
    border-color: #fc83bb;
  }
`;
const ErrorMessage = styled.p`
  color: red;
  margin: 0 0 10px 10px;
`;
const FormOption = styled.option``;
const LabelTitle = styled.p`
  font-size: 16px;
  padding: 7px 0;
  margin: 0px;
`;
const TextArea = styled.textarea`
  width: 100%;
  padding: 5px 10px;
  border: 1px solid #111;
  border-radius: 5px;
  ::placeholder {
    font-size: 16px;
  }
`;
const MentorBookingAppointment = (props) => {
  const url = ApiURL();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const bookMentorHandler = async (data) => {
    const username = user.user_firstname + " " + user.user_lastname;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Are you online?");
    };
    script.onload = async () => {
      try {
        dispatch(showLoadingHandler());
        const result = await axios.post(
          `${url}api/v1/mentor/booking/appointment/create-order`,
          {
            mentorId: props.singleMentor[0].mentor_dtls_id,
            menteeEmail: user?.user_email,
            userId: user?.user_id,
            mentorTimeSlotDuration: props.mentorTimeSlotDuration,
          }
        );
        if (result.data.error) {
          return (
            toast.error(result.data.error, {
              position: "top-center",
            }),
            dispatch(hideLoadingHandler())
          );
        }
        console.log(result)
        const { amount, id: order_id, currency } = result?.data.success;
        const {
          data: { key: razorpayKey },
        } = await axios.get(`${url}api/get-razorpay-key`);
        const options = {
          key: razorpayKey,
          amount: amount?.toString(),
          currency: currency,
          name: "Navrik Software Solutions",
          description: "Paying for the mentor",
          image: logo,
          order_id: order_id,
          handler: async function (response) {
            const res = await axios.post(
              `${url}api/v1/mentor/booking/appointment/create-booking-appointment`,
              {
                amount: amount,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                mentorId: props.singleMentor[0].mentor_dtls_id,
                userId: user?.user_id,
                date: new Date(props.selectedDate).toLocaleDateString(),
                userEmail: user?.user_email,
                mentorEmail: props.singleMentor[0].user_email,
                from: props.selectedSlot.from,
                to: props.selectedSlot.to,
                data: data,
                username: username,
                mentorUserDtlsId: props.singleMentor[0].user_dtls_id,
                mentorName:
                  props.singleMentor[0].mentor_firstname +
                  " " +
                  props.singleMentor[0].mentor_lastname,
                timeSlotId: props.selectedTimeSlotId,
              }
            );
            if (res.data.success) {
              return (
                (setSuccess(res.data.success),
                toast.success(res.data.success, {
                  position: "top-center",
                })),
                setLoading(false),
                reset(),
                props.showCloseHandler(),
                dispatch(hideLoadingHandler())
              );
            }
            if (res.data.error) {
              return (
                (setError(res.data.error),
                toast.error(res.data.error, {
                  position: "top-center",
                })),
                props.showCloseHandler(),
                dispatch(hideLoadingHandler())
              );
            }
          },
          prefill: {
            name: user?.user_firstname + " " + user?.user_lastname,
            email: user?.user_email,
            contact: "",
          },
          theme: {
            color: "#80c0f0",
          },
        };
        dispatch(hideLoadingHandler());
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        dispatch(hideLoadingHandler());
      }
    };
    document.body.appendChild(script);
    dispatch(hideLoadingHandler());
  };
  return (
    <Backdrop>
      <Modal>
        <CloseButtonDiv onClick={props.showCloseHandler}>
          <i className="fa-solid fa-close"></i>
        </CloseButtonDiv>
        <MentorBoxDiv>
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          {success && (
            <p style={{ color: "green", textAlign: "center" }}>{success}</p>
          )}
          <ConfirmBookingTitle>Confirm your booking!</ConfirmBookingTitle>
          <MentorSessionName>
            Mentorship session with
            <span>
              {" " +
                props.singleMentor[0].mentor_firstname +
                " " +
                props.singleMentor[0].mentor_lastname}
            </span>
          </MentorSessionName>
          <MentorBookedDate>
            <span>
              <i className="fa-solid fa-calendar"></i>
            </span>
            {new Date(props.selectedDate).toDateString()}
            <span>
              <i className="fa-solid fa-clock"></i>
            </span>
            {" " + props.selectedSlot.from + " - " + props.selectedSlot.to}
          </MentorBookedDate>
          <hr style={{ margin: "0px" }} />
        </MentorBoxDiv>
        <form onSubmit={handleSubmit(bookMentorHandler)}>
          <MentorBoxDiv>
            <LabelTitle>Choose one of the following :</LabelTitle>
            <FormSelect
              {...register("selected", {
                required: "Choose from the dropdown",
              })}
              name="selected"
            >
              <FormOption value=""></FormOption>
              {MentorFormOptions.map((option) => {
                return (
                  <FormOption value={option.value}>{option.label}</FormOption>
                );
              })}
            </FormSelect>
            {errors.selected && (
              <ErrorMessage>{errors.selected.message}</ErrorMessage>
            )}
            <LabelTitle>Please type your all queries. :</LabelTitle>
            <TextArea
              {...register("questions", {
                required: "Write all your queries",
              })}
              name="questions"
              placeholder="Ask your question....."
            ></TextArea>
            {errors.questions && (
              <ErrorMessage>{errors.questions.message}</ErrorMessage>
            )}
          </MentorBoxDiv>
          <MentorBoxDiv>
            <ConfirmButton type="submit">Confirm Booking</ConfirmButton>
          </MentorBoxDiv>
        </form>
      </Modal>
    </Backdrop>
  );
};

export default MentorBookingAppointment;
