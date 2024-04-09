import React, { useState } from "react";
import "./person-form.css";
import { useCreatePerson } from "../../query";

export interface FormData {
  name: string;
  show: string;
  actor: string;
  dob: string;
  movies: string;
}

interface Props {
  onCreatePerson: (formData: FormData) => void;
}

export function PersonForm({ onCreatePerson }: Props) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    show: "",
    actor: "",
    dob: "",
    movies: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { onCreatePerson: createPerson, error } = useCreatePerson();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createPerson(formData);
    setShowPopup(true);
  };

  const handleShowForm = () => {
    setShowForm(true);
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowForm(false);
    setFormData({
      name: "",
      show: "",
      actor: "",
      dob: "",
      movies: "",
    });
  };

  return (
    <div className="centered-container">
      {!showForm ? (
        <p className="clickable-text" onClick={handleShowForm}>
          Feeling like a director?{" "}
          <span className="clickable-link">
            Click here to cast your leading role!
          </span>
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="person-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="input-field"
            required
          />
          <input
            type="text"
            name="show"
            value={formData.show}
            onChange={handleChange}
            placeholder="Show"
            className="input-field"
            required
          />
          <input
            type="text"
            name="actor"
            value={formData.actor}
            onChange={handleChange}
            placeholder="Actor/Actress"
            className="input-field"
            required
          />
          <input
            type="text"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Date of Birth"
            className="input-field"
            required
          />
          <input
            type="text"
            name="movies"
            value={formData.movies}
            onChange={handleChange}
            placeholder="Movies"
            className="input-field"
            required
          />
          <button type="submit" className="submit-button">
            Create Person
          </button>
        </form>
      )}
      {showPopup && (
        <div className="popup">
          <p>Person created successfully!</p>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
    </div>
  );
}
