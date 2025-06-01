import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "reactstrap";
import lessonData from "../lessonData";



const EnglishLesson = () => {
  const navigate = useNavigate();
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const baseLetters = lessonData;

    const savedLetters = JSON.parse(localStorage.getItem("englishLetters")) || [];

    const newLetters = savedLetters.filter(
      (newL) => !baseLetters.some((baseL) => baseL.letter === newL.letter)
    );

    setLetters([...baseLetters, ...newLetters]);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this letter?")) {
      const savedLetters = JSON.parse(localStorage.getItem("englishLetters")) || [];
      const updatedLetters = savedLetters.filter((letter) => letter.id !== id);
      localStorage.setItem("englishLetters", JSON.stringify(updatedLetters));

      setLetters((prevLetters) => prevLetters.filter((letter) => letter.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <div className="text-left mb-6">
        <Button
          color="link"
          style={{ color: "black", padding: 0 }}
          onClick={() => navigate("/")}
          title="Back to Home"
          aria-label="Go back"
        >
          <FaArrowLeft size={24} />
        </Button>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-10">English Letters</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {letters.map((letter) => (
          <div
            key={letter.id}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col justify-center items-center text-center relative"
          >
            <div
              onClick={() => navigate(`/viewenglishlesson/${letter.id}`)}
              className="cursor-pointer w-full"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  navigate(`/viewenglishlesson/${letter.id}`, { state: { letter } });
                }
              }}
              aria-label={`Letter ${letter.letter}`}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Letter {letter.letter}</h2>
              <p className="text-6xl font-bold text-gray-800">{letter.letter}</p>
            </div>

            {!lessonData.some((baseL) => baseL.id === letter.id) && (
              <Button
                color="danger"
                size="sm"
                className="mt-4"
                onClick={() => handleDelete(letter.id)}
                aria-label={`Delete letter ${letter.letter}`}
              >
                Delete
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button
          color="primary"
          className="px-6 py-3 text-lg"
          onClick={() => navigate("/addenglishletter")}
        >
          Add Letter
        </Button>
      </div>
    </div>
  );
};

export default EnglishLesson;
