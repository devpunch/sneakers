import {useState} from "react";
import axios from "axios";

import {useCart} from "../../hooks/useCart";
import {Info} from "../info";

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Drawer = ({onClose, onRemove, items = [], opened,}) => {
  const {cartItems, setCartItems, totalPrice} = useCart();
  const [isOrderComplete, setIsOrderComplete] = useState(null);
  const [orderId, serOrderId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post("https://61237a91124d88001756829a.mockapi.io/orders", {
        items: cartItems
      });

      serOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://61237a91124d88001756829a.mockapi.io/Cart/' + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert("Ошибка при создании заказа :(");
    }
    setIsLoading(false);
  }

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : "" }`}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex align-center justify-between">
          Корзина
          <img className="removeBtn cu-p" src="/img/btn-remove.svg" alt="close" onClick={onClose}/>
        </h2>
        {
          items.length > 0 ?
            <div className="d-flex flex-column flex">
              <div className="items flex">
                {items.map((obj) => (
                  <div key={obj.id} className="cartItem d-flex align-center mb-20">
                    <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemIng"></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">
                        {obj.title}
                      </p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="remove"/>
                  </div>
                ))}

              </div>
              <div className="cartTotalBlock">
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice} руб.</b>
                  </li>
                  <li>
                    <span>Налог 5%</span>
                    <div></div>
                    <b>{Math.round((totalPrice) / 100 * 5)} руб.</b>
                  </li>
                </ul>
                <button
                  onClick={onClickOrder}
                  className="greenButton"
                  disabled={isLoading}
                >
                  Офрмить заказ <img src="/img/arrow.svg" alt="arrow"/>
                </button>
              </div>
            </div>
            : (
              <Info
                title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
                description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                image={isOrderComplete ? "/img/complete-order.png" : "/img/empty.png"}
              />
            )
        }
      </div>
    </div>
  )
}
