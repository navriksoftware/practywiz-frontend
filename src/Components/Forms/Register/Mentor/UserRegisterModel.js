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
import { useNavigate } from "react-router-dom";

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
  width: 30%;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #2dbedb;
    transition: all 0.5s ease-in-out;
  }
`;
const EditButton = styled.button`
  margin: 0 auto;
  width: 30%;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: lightgreen;
    transition: all 0.5s ease-in-out;
  }
`;
const FormSelect = styled.select`
  height: 30px;
  width: 100%;
  font-size: 18px;
  border-radius: 5px;
  padding-bottom: 10px;
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
  padding-bottom: 10px;
  border: 1px solid #111;
  border-radius: 5px;
  ::placeholder {
    font-size: 16px;
  }
`;
const BOX = styled.div`
  display: flex;
`;
const UserRegisterModel = (props) => {
  const navigate =useNavigate()
  const dispatch = useDispatch();
  const url = ApiURL();
  const userFirstRegisterHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoadingHandler());
      const res = await Promise.race([
        axios.post(`${url}api/v1/auth/mentor/register`, {
          firstname: props.firstname,
          lastName: props.lastName,
          phoneNumber: props.phoneNumber,
          emailId: props.emailid,
        }),
        new Promise(
          (_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
        ),
      ]);

      if (res.data.success) {
        return (
          toast.success(
            "You are account has been successfully registered, You can continue fill the mentor application.."
          ),
          props.showUserRegisterModel(),
          props.setInputOn(true)
        );
      } else if (res.data.error) {
        if(res.data.error === "This email address is already in use, Please use another email address or Login in to update the mentor details in Dashboard."){
          return toast.error(res.data.error), props.showUserRegisterModel(),navigate("/login")

        }
        return toast.error(res.data.error), props.showUserRegisterModel();
      }
    } catch (error) {
      if (error.message === "Request timed out") {
        return (
          toast.error("Request timeout. Please try again."),
          props.showUserRegisterModel(),
          props.setInputOn(true)
        );
      } else {
        return props.showUserRegisterModel(), props.setInputOn(true);
      }
    } finally {
      return (
        dispatch(hideLoadingHandler()),
        props.showUserRegisterModel(),
        props.setInputOn(true)
      );
    }
  };
  return (
    <Backdrop>
      <Modal>
        <CloseButtonDiv onClick={props.showUserRegisterModel}>
          <i className="fa-solid fa-close"></i>
        </CloseButtonDiv>
        <MentorBoxDiv>
          <ConfirmBookingTitle>
            Is this Email address is correct ? or Do you want to edit this ?!
          </ConfirmBookingTitle>{" "}
          <hr style={{ margin: "0px" }} />
          <ConfirmBookingTitle>
            <p> {props.emailid}</p>
          </ConfirmBookingTitle>
        </MentorBoxDiv>
        <form>
          <BOX>
            <EditButton type="button" onClick={props.showUserRegisterModel}>
              Edit
            </EditButton>
            <ConfirmButton type="submit" onClick={userFirstRegisterHandler}>
              Submit
            </ConfirmButton>
          </BOX>
        </form>
      </Modal>
    </Backdrop>
  );
};

export default UserRegisterModel;