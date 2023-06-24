import { useState, useEffect } from 'react';
import axios from 'axios';

export default function getData(url) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function obtainData() {

            setLoading(true);
            const response = await axios.get(url)
            setData(response.data);
            setLoading(false);

        }

        obtainData();

    }, [url]);

    return { data, loading };

}