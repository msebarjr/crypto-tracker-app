import CoinOwnedRow from "./CoinOwnedRow";

import "../../styles/CoinsOwnedTable.module.css";

function CoinsOwnedTable({ coinsOwned }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Coin</th>
                    <th>Price</th>
                    <th>24h</th>
                    <th>Units Own</th>
                    <th>Last 7 Days</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {coinsOwned.map((coin) => (
                    <CoinOwnedRow key={coin.id} coin={coin} />
                ))}
            </tbody>
        </table>
    );
}

export default CoinsOwnedTable;
