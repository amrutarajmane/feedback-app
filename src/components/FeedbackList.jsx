
import FeedbackItem from "./FeedbackItem"
import { motion, AnimatePresence } from 'framer-motion'
import FeedbackContext from "../context/FeedbackContext"
import { useContext } from "react"

function FeedbackList() {

  const {Feedback} = useContext(FeedbackContext)

  

   
   
   
    if (!Feedback  || Feedback.length === 0){
        return <p>No Feedback Yet</p>
    }

     return (
       <div className="Feedback-List">
         <AnimatePresence>
          {Feedback.map((item) => (
           <motion.div  key={item.id}  initial = {{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <FeedbackItem key={item.id} item={item} />
       </motion.div>
          ))}
         </AnimatePresence>
       </div>
     )
  
        }

// return (
  //   <div className='feedback-list'>
  //     {feedback.map((item) => (
  //       <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
  //     ))}
  //   </div>
  // )



export default FeedbackList
