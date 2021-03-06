import { useState, useContext, useEffect } from "react";
import RatingSelect from "./RatingSelect";
import Card from "../shared/Card";
import Button from "../shared/Button";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState("10");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const { addFeedback, FeedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (FeedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(FeedbackEdit.item.text);
      setRating(FeedbackEdit.item.rating);
    }
  }, [FeedbackEdit]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (newText !== "" && newText.trim().length <= 10) {
      setMessage("Text must be at least 10 character");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };
      if (FeedbackEdit.edit === true) {
        updateFeedback(FeedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }
      setText("");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us ?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
