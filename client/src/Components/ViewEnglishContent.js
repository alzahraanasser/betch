import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { FaArrowLeft } from "react-icons/fa";
import lessonData from "../lessonData";

const ViewEnglishLessonContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [letterData, setLetterData] = useState(null);

  useEffect(() => {
    // جلب الحروف المحفوظة في localStorage
    const savedLetters = JSON.parse(localStorage.getItem("englishLetters")) || [];
    const baseLetters = lessonData;

    // دمج القائمتين (الحروف الأساسية + الحروف المحفوظة)
    const allLetters = [...baseLetters, ...savedLetters];

    // البحث عن الحرف المطابق بالـ id (تحويل id إلى نص للمقارنة)
    const foundLetter = allLetters.find((l) => String(l.id) === id);

    setLetterData(foundLetter);
  }, [id]);

  if (!letterData) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <p className="text-lg text-gray-600">Letter not found.</p>
        <Button color="primary" onClick={() => navigate("/englishlesson")}>
          العودة إلى قائمة الحروف
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="text-left mb-6">
        <Button
          color="link"
          style={{ color: "black", padding: 0 }}
          onClick={() => navigate("/englishlesson")}
          title="Back to English Letters"
        >
          <FaArrowLeft size={24} />
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Letter Details</h1>
        <p className="text-7xl font-bold text-gray-900 mb-6">{letterData.letter || letterData.title}</p>
        <p className="text-lg text-gray-700">{letterData.description}</p>
      </div>
    </div>
  );
};

export default ViewEnglishLessonContent;
