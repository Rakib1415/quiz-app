import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from "react";


const useQuestions = (id) =>{
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState([]);


    useEffect(() => {

        const fetchQuestions = async() => {
            
            const db = getDatabase();
            const quizRef = ref(db, `quiz/${id}/questions`);
            const quizQuery = query(quizRef, orderByKey());
            try{
                setLoading(true);
                setError(false);
                const snapshot = await get(quizQuery);
                setLoading(false);
                if(snapshot.exists()){
                    setQuestions((prevQuestion) => {
                        return [...prevQuestion, ...Object.values(snapshot.val())];
                    })
                }
            }catch(err){
                console.log(err);
                setLoading(false);
                setError(true);
            }
        }

        fetchQuestions();

    }, [id]);

    return {
        loading,
        error,
        questions
    }
    

};

export default useQuestions;