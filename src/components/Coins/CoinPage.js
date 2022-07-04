import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function CoinPage() {
    const location = useLocation();
    const coinId = location.state;

    const [coin, setCoin] = useState({});
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&sparkline=true`;

    useEffect(() => {
        axios.get(url).then((response) => {
            setCoin(response.data);
            console.log(response.data);
        });
    }, [url]);

    return <div>Hello</div>;
}

export default CoinPage;
