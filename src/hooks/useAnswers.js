import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from "react";

const useAnswers = (id) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {

        const fetchAnswers = async() => {
            const db = getDatabase();
            const answersRef = ref(db, `answers/${id}/questions`);
            const answersQuery = query(answersRef, orderByKey());

            try{
                setLoading(true);
                setError(false);

                const snapshot = await get(answersQuery);
                setLoading(false);
                if(snapshot.exists()){
                    const answersArr = snapshot.val();
                    setAnswers(answersArr);
                }
            }catch(err){
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchAnswers();

    }, []);

    return {
        loading,
        error,
        answers
    }

};

export default useAnswers;