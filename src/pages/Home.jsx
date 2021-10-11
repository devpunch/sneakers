import {Card} from "../components/Card";



export const Home = ({
                       items,
                       searchValue,
                       setSearchValue,
                       onChangeSearchInput,
                       onAddFavorite,
                       onAddToCart,
                       isLoading
                     }) => {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue)
    );
    return (isLoading ? [...Array(6)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ))
  }

  return (
    <div className="content p-40">
      <img className="mb-20 cu-p" src="/img/main.jpg" alt="main"/>
      <div className="d-flex justify-between align-center mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кросовки"}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search"/>
          {
            searchValue &&
            <img
              onClick={() => setSearchValue('')}
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Search"
            />
          }
          <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Поиск"/>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {renderItems()}
      </div>
    </div>
  )
}