import React, { useState, useEffect } from "react"; 
import { Button, Container, Alert } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEnglishLesson, getEnglishLessons } from "../Features/EnglishLessonSlice";

const AddEnglishLesson = () => {
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonCode, setLessonCode] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lessons, status, error } = useSelector((state) => state.englishLessons);
  const { isLogin } = useSelector((state) => state.users);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    } else {
      dispatch(getEnglishLessons());
    }
  }, [isLogin, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lessonTitle || !lessonCode) {
      setMessage({ type: "error", text: "Please enter lesson title and code." });
      return;
    }

    const isDuplicate = lessons.some(
      (lesson) =>
        lesson.lessonTitle.toLowerCase() === lessonTitle.toLowerCase() ||
        lesson.lessonCode.toLowerCase() === lessonCode.toLowerCase()
    );

    if (isDuplicate) {
      setMessage({
        type: "error",
        text: "A lesson with the same title or code already exists.",
      });
      return;
    }

    try {
      await dispatch(addEnglishLesson({ lessonTitle, lessonCode })).unwrap();
      setMessage({ type: "success", text: "Lesson added successfully!" });
      setLessonTitle("");
      setLessonCode("");

      setTimeout(() => navigate("/englishlessons"), 1000);
    } catch (error) {
      setMessage({ type: "error", text: "Error occurred while adding the lesson." });
    }
  };

  return (
    <div className="main-container">
      <Container className="mt-5">
        <h1 className="text-center">Add English Lesson</h1>

        {message && (
          <Alert color={message.type === "error" ? "danger" : "success"}>
            {message.text}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Lesson Title"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="text"
            placeholder="Lesson Code"
            value={lessonCode}
            onChange={(e) => setLessonCode(e.target.value)}
            className="form-control mb-3"
          />
          <Button type="submit" color="primary" className="w-100" disabled={status === "loading"}>
            {status === "loading" ? "Adding..." : "Add Lesson"}
          </Button>
        </form>

        {error && <Alert color="danger" className="mt-3">{error}</Alert>}
      </Container>
    </div>
  );
};

export default AddEnglishLesson;
