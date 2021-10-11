import {Card} from "../components/Card";
import {useEffect, useState} from "react";
import axios from "axios";

export const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get("https://61237a91124d88001756829a.mockapi.io/orders");
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Не удалось загрузить покупки");
        console.error(error)
      }
    })()
  }, []);


  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(6)] : orders).map((item, index) => (
          <Card
            key={index}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}