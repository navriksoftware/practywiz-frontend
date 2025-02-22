import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./MentorCaseStudyInput.css";
import { toast } from "react-toastify";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";
import { ApiURL } from "../../../../Utils/ApiURL";
import { useDispatch } from "react-redux";
import caseCategories from "./caseCategories.json";

function MentorCaseStudyInput({ user, token, data }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
 
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filteredCaseCategories, setFilteredCaseCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleInputChange = (event) => {
    const value = event.target.value;

    setSearchTerm(value);
    setDropdownVisible(value !== "");
    setFilteredCaseCategories(
      caseCategories.caseCategories.filter((category) =>
        category.label.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleOptionClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm(category.label);
    setDropdownVisible(false);
    setValue("caseTopic", category.label);
  };

  const [numRoles, setNumRoles] = useState(0);
  const [roleObject, setRoleObject] = useState({});
  const [loading, setLoading] = useState(false);
  const url = ApiURL();
  const dispatch = useDispatch();

  const handleNumRolesChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumRoles(num);

    const newRoleObject = {};
    for (let i = 1; i <= num; i++) {
      newRoleObject[`role${i}`] = "";
    }
    setRoleObject(newRoleObject);
  };

  const onSubmit = async (caseData) => {
    const caseStudyData = {
      ...caseData,
      roles: [roleObject],
    };
    try {
      dispatch(showLoadingHandler());
      const response = await Promise.race([
        axios.post(
          `${url}api/v1/mentor/dashboard/case-study/create-case-study`,
          {
            data: caseStudyData,
            roles: JSON.stringify(caseStudyData.roles),
            mentorUserId: user?.user_id,
            mentorDtlsId: data[0]?.mentor_dtls_id,
          },
          {
            headers: { authorization: "Bearer " + token },
          }
        ),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 45000)
        ),
      ]);
      if (response.data.success) {
        dispatch(hideLoadingHandler());
        toast.success("Thanks for submitting the case study");
        handleClear();
      } else if (response.data.error) {
        dispatch(hideLoadingHandler());
        toast.error("There is some error while submitting the case study");
      }
    } catch (error) {
      toast.error("There is some error while submitting the case study");
      dispatch(hideLoadingHandler());
    } finally {
      dispatch(hideLoadingHandler());
    }
  };

  const handleRoleChange = (e) => {
    const { name, value } = e.target;
    setRoleObject((prevRoles) => ({
      ...prevRoles,
      [name]: value,
    }));
  };

  const handleClear = () => {
    reset({
      caseTopic: "",
      caseTitle: "",
      caseSummary: "",
      caseBackground: "",
      characters: "",
      roleOfMainCharacter: "",
      challenge: "",
      lesson: "",
      futureSkills: "",
      resource: "",
    });
    setNumRoles(0);
    setRoleObject({});
    setSearchTerm("");
    setDropdownVisible(false);
    setSelectedCategory(null);
  };

  return (
    <div id="CaseStudyB">
      <div className="container-of-case-study">
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <h1 style={{ fontSize: "36px" }}>Input form for Case Study</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="space-between label-case-input posrelativ">
            <h5>
              Choose the Case Category{" "}
              <span className="RedColorStarMark">*</span>
            </h5>

            <input
              type="text"
              className="input-border-radius label-case-input-fields"
              placeholder="Start typing to choose category"
              value={searchTerm}
              {...register("caseCategory", {
                required: "Case Category is required",
              })}
              onChange={handleInputChange}
            />
            {dropdownVisible && filteredCaseCategories.length > 0 && (
              <div className="dropdown-content">
                {filteredCaseCategories.slice(0, 50).map((category, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleOptionClick(category)}
                  >
                    {category.label}
                  </div>
                ))}
              </div>
            )}
            {errors.caseCategory && (
              <p className="Error-meg-login-register">
                {errors.caseCategory.message}
              </p>
            )}
          </label>

          <label className="space-between label-case-input">
            <h5>
              Title of Case <span className="RedColorStarMark">*</span>
            </h5>
            <input
              className="input-border-radius label-case-input-fields"
              {...register("caseTitle", {
                required: "Case title is required",
              })}
              type="text"
              placeholder="Enter case title"
            />
            {errors.caseTitle && (
              <p className="Error-meg-login-register">
                {errors.caseTitle.message}
              </p>
            )}
          </label>

          <label className="space-between label-case-input">
            <h5>
              Case Summary <span className="RedColorStarMark">*</span>
            </h5>
            <textarea
              className="label-case-input-fields"
              {...register("caseSummary", {
                required: "Case summary is required",
              })}
              placeholder="Enter summary here..."
            />
            {errors.caseSummary && (
              <p className="Error-meg-login-register">
                {errors.caseSummary.message}
              </p>
            )}
          </label>

          <label className="space-between label-case-input">
            <h5>
              Case Background <span className="RedColorStarMark">*</span>
            </h5>
            <textarea
              className="label-case-input-fields"
              {...register("caseBackground", {
                required: "Case background is required",
              })}
              placeholder="Enter background here..."
            />
            {errors.caseBackground && (
              <p className="Error-meg-login-register">
                {errors.caseBackground.message}
              </p>
            )}
          </label>

          <label className="space-between label-case-input">
            <h5>
              Main Challenge <span className="RedColorStarMark">*</span>
            </h5>
            <textarea
              className="label-case-input-fields"
              {...register("challenge", {
                required: "Main challenge is required",
              })}
              placeholder="Enter main challenge..."
            />
            {errors.challenge && (
              <p className="Error-meg-login-register">
                {errors.challenge.message}
              </p>
            )}
          </label>

          <label className="space-between label-case-input">
            <h5>
              Number of Characters <span className="RedColorStarMark">*</span>
            </h5>
            <input
              className="label-case-input-fields"
              type="number"
              {...register("characters", {
                required: "Number of characters is required",
              })}
              min="0"
              onChange={handleNumRolesChange}
            />
            {errors.characters && (
              <p className="Error-meg-login-register">
                {errors.characters.message}
              </p>
            )}
          </label>

          {numRoles > 0 && (
            <div>
              <h5>
                Role of Each Character{" "}
                <span className="RedColorStarMark">*</span>
              </h5>
              {Array.from({ length: numRoles }).map((_, i) => {
                const roleKey = `role${i + 1}`;
                return (
                  <label
                    key={roleKey}
                    className="space-between label-case-input"
                  >
                    <h5>{`Role ${i + 1}`}</h5>
                    <input
                      className="input-border-radius label-case-input-fields"
                      name={roleKey}
                      type="text"
                      placeholder={`Enter role ${i + 1}`}
                      value={roleObject[roleKey]}
                      onChange={handleRoleChange}
                      required
                    />
                  </label>
                );
              })}
            </div>
          )}

          <label className="space-between label-case-input">
            <h5>
              Role of Main Character <span className="RedColorStarMark">*</span>
            </h5>
            <input
              className="input-border-radius label-case-input-fields"
              {...register("roleOfMainCharacter", {
                required: "Main character's role is required",
              })}
              type="text"
              placeholder="Enter main character's role"
            />
            {errors.roleOfMainCharacter && (
              <p className="Error-meg-login-register">
                {errors.roleOfMainCharacter.message}
              </p>
            )}
          </label>

          <label className="space-between label-case-input">
            <h5>
              Lesson to Learn <span className="RedColorStarMark">*</span>
            </h5>
            <textarea
              className="label-case-input-fields"
              {...register("lesson", { required: "Lesson is required" })}
              placeholder="Enter lesson..."
            />
            {errors.lesson && (
              <p className="Error-meg-login-register">
                {errors.lesson.message}
              </p>
            )}
          </label>

          <label className="space-between label-case-input">
            <h5>
              Future Skills to Develop{" "}
              <span className="RedColorStarMark">*</span>
            </h5>
            <textarea
              className="label-case-input-fields"
              {...register("futureSkills", {
                required: "Future skills are required",
              })}
              placeholder="Enter future skills..."
            />
            {errors.futureSkills && (
              <p className="Error-meg-login-register">
                {errors.futureSkills.message}
              </p>
            )}
          </label>

          <label className="space-between label-case-input">
            <h5>Resources (optional)</h5>
            <textarea
              className="label-case-input-fields"
              {...register("resource")}
              placeholder="Enter resources..."
            />
          </label>

          <div className="button-container-case-input">
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MentorCaseStudyInput;
