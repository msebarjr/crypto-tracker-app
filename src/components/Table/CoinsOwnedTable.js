import CoinOwnedRow from "./CoinOwnedRow";

import "../../styles/CoinsOwnedTable.module.css";

function CoinsOwnedTable({ coinsOwn, coins }) {
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
                {coinsOwn.map((coin) => {
                    const coinsOwnData = coins.find((c) => c.id === coin.id);

                    return (
                        <CoinOwnedRow
                            key={coinsOwnData.id}
                            coin={coinsOwnData}
                        />
                    );
                })}
            </tbody>
        </table>
    );
}

export default CoinsOwnedTable;
