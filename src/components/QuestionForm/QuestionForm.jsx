import Button from "../Button/Button";
import { useState } from "react";
import { firestore, serverTimestamp } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./questionform.css";

const QuestionForm = () => {
  const [formDisabled, setFormDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormDisabled(true);

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const question = formData.get("question");
    const tags = formData
      .get("tags")
      .split(",")
      .map((tag) => tag.trim());

    try {
      await addDoc(collection(firestore, "questions"), {
        title,
        question,
        tags,
        createdAt: serverTimestamp(),
      });

      e.target.reset();
      alert("Question posted successfully");
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setFormDisabled(false);
    }
  };

  return (
    <form className="app__questionform" onSubmit={handleSubmit}>
      <div className="form-group form-title">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          placeholder="Title..."
          required
          disabled={formDisabled}
        />
      </div>

      <div className="form-group">
        <label htmlFor="question">Describe your problem</label>
        <textarea
          id="question"
          name="question"
          className="form-control"
          placeholder="Enter your question..."
          rows="15"
          required
          disabled={formDisabled}
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          name="tags"
          className="form-control"
          placeholder="Tags..."
          required
          disabled={formDisabled}
        />
      </div>
      <div className="form-btn-container">
        <Button type="submit" disabled={formDisabled}>
          Post
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
