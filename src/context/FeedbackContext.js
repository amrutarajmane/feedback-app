import { createContext,useContext,  useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [Feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This item is from Feedback1",
      rating: 10,
    },

    {
      id: 2,
      text: "This item is from Feedback2",
      rating: 9,
    },

    {
      id: 3,
      text: "This item is from Feedaback3",
      rating: 8,
    },
  ]);

  const [FeedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  //ADD FEEDBACK

  function addFeedback(newFeedback) {
    newFeedback.id = uuidv4();
    setFeedback((prev) => [newFeedback, ...prev]); //callback function
    // setFeedback([newFeedback, ...Feedback]);
  }

  //DELETEfEEDBACK

  function deleteFeedback(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(Feedback.filter((item) => item.id !== id));
    }
  }

  //UPDATE FEEDBACK ITEM
  const updateFeedback = (id, updItem) => {
    setFeedback(
      Feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  //SET ITEM TO BE UPDATED
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        Feedback,
        deleteFeedback,
        addFeedback,
        editFeedback, //IT IS A FUNCTION WHICH RUNS THE FAEDIT
        FeedbackEdit, //state
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
