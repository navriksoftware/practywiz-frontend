export const generateQuestionId = (type, formData) => {
  const prefix = type === "fact" ? "FQ" : type === "analysis" ? "AQ" : "RQ";
  const questions = formData[`${type}BasedQuestions`] || [];
  return `${prefix}${questions.length + 1}`;
};

export const addQuestion = (type, setFormData, formData) => {
  let newQuestion;
  if (type === "fact") {
    newQuestion = {
      id: generateQuestionId(type, formData),
      Question: "",
      question_format: "multiple-choice",
      options: ["", ""],
      modelAnswer: "",
      maxMark: 1,
    };
  } else if (type === "analysis") {
    newQuestion = {
      id: generateQuestionId(type, formData),
      Question: "",
      question_format: "subjective", // Always subjective
      modelAnswer: "",
      maxMark: 1,
    };
  } else {
    // research
    newQuestion = {
      id: generateQuestionId(type, formData),
      Question: "",
      question_format: "multiple-choice",
      options: ["", ""],
      modelAnswer: "",
      maxMark: undefined,
    };
  }

  const key = `${type}BasedQuestions`;
  setFormData((prev) => ({
    ...prev,
    [key]: [...prev[key], newQuestion],
  }));
};

export const updateQuestion = (
  type,
  index,
  field,
  value,
  setFormData,
  formData
) => {
  const key = `${type}BasedQuestions`;
  setFormData((prev) => ({
    ...prev,
    [key]: prev[key].map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    ),
  }));
};

export const removeQuestion = (type, index, setFormData, formData) => {
  const key = `${type}BasedQuestions`;
  setFormData((prev) => ({
    ...prev,
    [key]: prev[key].filter((_, i) => i !== index),
  }));
};

export const addOption = (type, questionIndex, setFormData, formData) => {
  const key = `${type}BasedQuestions`;
  setFormData((prev) => ({
    ...prev,
    [key]: prev[key].map((q, i) =>
      i === questionIndex && q.options.length < 6
        ? { ...q, options: [...q.options, ""] }
        : q
    ),
  }));
};

export const removeOption = (
  type,
  questionIndex,
  optionIndex,
  setFormData,
  formData
) => {
  const key = `${type}BasedQuestions`;
  setFormData((prev) => ({
    ...prev,
    [key]: prev[key].map((q, i) =>
      i === questionIndex && q.options.length > 2
        ? {
            ...q,
            options: q.options.filter((_, oi) => oi !== optionIndex),
            modelAnswer:
              q.modelAnswer === q.options[optionIndex] ? "" : q.modelAnswer,
          }
        : q
    ),
  }));
};

export const updateOption = (
  type,
  questionIndex,
  optionIndex,
  value,
  setFormData,
  formData
) => {
  const key = `${type}BasedQuestions`;
  setFormData((prev) => ({
    ...prev,
    [key]: prev[key].map((q, i) =>
      i === questionIndex
        ? {
            ...q,
            options: q.options.map((opt, oi) =>
              oi === optionIndex ? value : opt
            ),
          }
        : q
    ),
  }));
};

export const validateForm = (formData, setErrors) => {
  const newErrors = {};

  if (!formData.title.trim()) newErrors.title = "Title is required";
  if (!formData.author.trim()) newErrors.author = "Author is required";
  if (!formData.category) newErrors.category = "Category is required";

  ["fact", "analysis", "research"].forEach((type) => {
    const questions = formData[`${type}BasedQuestions`];
    questions.forEach((q, i) => {
      const prefix = `${type}_${i}`;

      // Question text required
      if (!q.Question || !q.Question.trim()) {
        newErrors[`${prefix}_question`] = "Question is required";
      }

      // Fact-based: always multiple-choice
      if (type === "fact") {
        // Options required and must be filled
        if (!Array.isArray(q.options) || q.options.length < 2) {
          newErrors[`${prefix}_options`] = "At least two options are required";
        } else if (q.options.some((opt) => !opt.trim())) {
          newErrors[`${prefix}_options`] = "All options must be filled";
        } else {
          const uniqueOptions = new Set(q.options.map((opt) => opt.trim()));
          if (uniqueOptions.size !== q.options.length) {
            newErrors[`${prefix}_options`] = "Options must be unique";
          }
        }
        // Model answer required
        if (!q.modelAnswer || !q.modelAnswer.trim()) {
          newErrors[`${prefix}_answer`] = "Correct answer is required";
        }
        // Max mark required
        if (!q.maxMark || q.maxMark < 1) {
          newErrors[`${prefix}_marks`] = "Max marks must be at least 1";
        }
      }

      // Analysis-based: always subjective
      if (type === "analysis") {
        // Model answer required
        if (!q.modelAnswer || !q.modelAnswer.trim()) {
          newErrors[`${prefix}_answer`] = "Correct answer is required";
        }
        // Max mark required
        if (!q.maxMark || q.maxMark < 1) {
          newErrors[`${prefix}_marks`] = "Max marks must be at least 1";
        }
      }

      // Research-based: can be multiple-choice or subjective, but no modelAnswer or maxMark
      if (type === "research") {
        if (!q.Question || !q.Question.trim()) {
          newErrors[`${prefix}_question`] = "Question is required";
        }
        if (q.question_format === "multiple-choice") {
          if (!Array.isArray(q.options) || q.options.length < 2) {
            newErrors[`${prefix}_options`] =
              "At least two options are required";
          } else if (q.options.some((opt) => !opt.trim())) {
            newErrors[`${prefix}_options`] = "All options must be filled";
          } else {
            const uniqueOptions = new Set(q.options.map((opt) => opt.trim()));
            if (uniqueOptions.size !== q.options.length) {
              newErrors[`${prefix}_options`] = "Options must be unique";
            }
          }
        }
        // No modelAnswer or maxMark validation for research-based
      }
    });
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const transformQuestionsForAPI = (questions, type = "") => {
  return questions.map((q) => {
    const isSubjective = q.question_format === "subjective";
    const { modelAnswer, question_format, ...rest } = q;

    const transformed = {
      ...rest,
      questionType: question_format,
    };

    // Only add correctAnswer if not research-based
    if (type !== "research") {
      transformed.correctAnswer = modelAnswer;
    }

    // Remove options if subjective
    if (isSubjective && "options" in transformed) {
      delete transformed.options;
    }

    return transformed;
    
  });
};
