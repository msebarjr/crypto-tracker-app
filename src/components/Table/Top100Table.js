import Top100Row from "./Top100Row";

function Top100Table({ data }) {
    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>#</th>
                    <th>Coin</th>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>24h</th>
                    <th>24h Volume</th>
                    <th>Mkt</th>
                    <th>Last 7 Days</th>
                </tr>
            </thead>
            <tbody>
                {data.map((coin) => (
                    <Top100Row key={coin.id} coin={coin} />
                ))}
            </tbody>
        </table>
    );
}

export default Top100Table;
