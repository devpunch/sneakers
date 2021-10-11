import {useContext, useState} from "react";
import ContentLoader from "react-content-loader";

import AppContext from "../../context";

import style from './Card.module.scss';

export const Card = (
  {
    id,
    title,
    price,
    imageUrl,
    onFavorite,
    onPlus,
    favorited = false,
    loading = false
  }) => {
  const {isItemAdded, isFavoritesAdded} = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const obj = {id, parentId: id, title, price, imageUrl};

  const onClickPlus = () => {
    onPlus(obj);
  }

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  }

  return (
    <div className={style.card}>
      {
        loading ?
          (
            <ContentLoader
              speed={2}
              width={150}
              height={187}
              viewBox="0 0 150 187"
              backgroundColor="#ecebeb"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="10" ry="10" width="150" height="90"/>
              <rect x="0" y="100" rx="5" ry="5" width="150" height="15"/>
              <rect x="1" y="128" rx="5" ry="5" width="100" height="15"/>
              <rect x="0" y="159" rx="5" ry="5" width="80" height="24"/>
              <rect x="118" y="154" rx="10" ry="10" width="32" height="32"/>
            </ContentLoader>
          ) :
          (
            <>
              {
                onFavorite &&
                <div className={style.favorite} onClick={onClickFavorite}>
                  <img src={isFavoritesAdded(id) ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="Unliked"/>
                </div>
              }
              <img width={133} height={112} src={imageUrl} alt="sneakers"/>
              <h5>{title}</h5>
              <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                  <span>Цена</span>
                  <b>{price} руб.</b>
                </div>
                {onPlus && <img
                  className={style.plus}
                  onClick={onClickPlus}
                  src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                  alt="icon"
                />}
              </div>
            </>
          )
      }
    </div>
  )
}