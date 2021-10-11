import {useContext} from "react";
import {Card} from "../components/Card";
import { NoFavorites } from "../components/noFavorites";
import AppContext from "../context";

export const Favorites = () => {
    const { favorites, onAddFavorite, onAddToCart } = useContext(AppContext);
    return (
        <div className="content p-40">
            <div className="d-flex justify-between align-center mb-40">
                <h1>Мои Закладки</h1>
            </div>
          {
            favorites.length > 0 ?
              <div className="d-flex flex-wrap">
                {
                  favorites.map((item, index) => (
                    <Card
                      key={index}
                      favorited={true}
                      onFavorite={onAddFavorite}
                      onPlus={(obj) => onAddToCart(obj)}
                      {...item}
                    />
                  ))
                }
              </div> :
              <NoFavorites/>
          }

        </div>
    )
}