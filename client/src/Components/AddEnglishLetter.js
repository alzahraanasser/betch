import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Button, Input, Label, FormGroup, Form } from "reactstrap";

const AddEnglishLetter = () => {
  const navigate = useNavigate();
  const [letter, setLetter] = useState("");

  const handleAddLetter = (e) => {
    e.preventDefault();

    if (letter.trim() === "") {
      alert("Please enter a letter.");
      return;
    }

    const savedLetters = JSON.parse(localStorage.getItem("englishLetters")) || [];

    const newLetter = {
      id: Date.now(),
      letter: letter.toUpperCase(),
    };

    localStorage.setItem("englishLetters", JSON.stringify([...savedLetters, newLetter]));

    alert("Letter added successfully!");
    navigate("/englishlesson");
  };

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

      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Add New English Letter</h1>

      <Form onSubmit={handleAddLetter} className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <FormGroup>
          <Label for="letterInput" className="mb-2 font-semibold">Enter Letter:</Label>
          <Input
            id="letterInput"
            type="text"
            maxLength={1}
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            className="text-center text-3xl font-bold"
            required
          />
        </FormGroup>

        <Button type="submit" color="primary" className="mt-4 w-full text-lg py-2">
          Add Letter
        </Button>
      </Form>
    </div>
  );
};

export default AddEnglishLetter;
