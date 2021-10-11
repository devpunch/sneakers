import {useHistory} from "react-router-dom";

export const NoFavorites = () => {
  const history = useHistory();

  const handleClickBack = () => {
    history.push("/");
  }

    return (
      <div className="cartEmpty d-flex align-center justify-center flex-column flex">
        <img className="mb-20" width="70px" src="/img/noFavorites.png" alt="Empty"/>
        <h2 className="clear mb-20 mt-5">Закладок нет :(</h2>
        <p className="opacity-6">Вы ничего не добавляли в закладки</p>
        <button onClick={handleClickBack} className="greenButton">
          <img src="img/arrow.svg" alt="Arrow"/>
          Вернуться назад
        </button>
      </div>
    )
}