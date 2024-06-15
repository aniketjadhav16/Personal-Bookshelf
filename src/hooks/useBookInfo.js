import { useEffect, useState } from "react";

function useBookInfo(book) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (book) {
            fetch(`https://openlibrary.org/search.json?q=${book}&limit=10&page=1`)
                .then((res) => res.json())
                .then((res) => {
                    setData(res.docs || []);
                })
                .catch((error) => {
                    console.error("Error fetching book data:", error);
                });
        }
    }, [book]);

    return data;
}

export default useBookInfo;
