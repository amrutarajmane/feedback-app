import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [Feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [FeedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  //FETCH FEEDBACK
  const fetchFeedback = async () => {
      const response = await fetch(`/feedback?_sort=id&_order=desc`)
      const data = await response.json();
      
      setFeedback(data);
    
      setIsLoading(false);
    }
  

  //ADD FEEDBACK
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()

    setFeedback((prev) => [data, ...prev]);// callback function
    setFeedback([newFeedback, ...Feedback]);
  }


  // function addFeedback(newFeedback) {
  //   newFeedback.id = uuidv4();
  //   setFeedback((prev) => [newFeedback, ...prev]); //callback function//change to upper code for json 
  //   // setFeedback([newFeedback, ...Feedback]);
  // }

  //DELETEfEEDBACK
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' })

      setFeedback(Feedback.filter((item) => item.id !== id))
    }
  }
  


  // function deleteFeedback(id) {
  //   if (window.confirm("Are you sure you want to delete?")) {
  //     setFeedback(Feedback.filter((item) => item.id !== id));
  //   }
  // }

  //UPDATE FEEDBACK ITEM
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })

    const data = await response.json()

    setFeedback(
      Feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    )
  }

  // const updateFeedback = (id, updItem) => {
  //   setFeedback(
  //     Feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
  //   );
  // };

  //SET ITEM TO BE UPDATED(for editing Feedback)
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
        isLoading
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
    }

export default FeedbackContext;
