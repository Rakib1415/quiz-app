import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from 'firebase/database';
import { useEffect, useState } from "react";

const useVideoList = (page) => {
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [videos, setVideos] = useState([]);

    useEffect(() => {

        const fetchVideos = async() => {

            const db = getDatabase();
            const videoRef = ref(db,'videos' );
            const videoQuery = query(videoRef, orderByKey(), startAt(""+page), limitToFirst(8));

            try{
                setLoading(true);
                setError(false);
                const snapshot = await get(videoQuery);
                setLoading(false);
                if(snapshot.exists()){
                    setVideos((prevVideos) => {
                        return [...prevVideos, ...Object.values(snapshot.val())]
                    })
                }else{
                    setHasMore(false);
                }
            }catch(err){
                setLoading(false);
                setError(true);
                console.log(err);
            }

        }
        fetchVideos();

    },[page]);

    return {
        videos,
        loading,
        error,
        hasMore
    }

};

export default useVideoList;