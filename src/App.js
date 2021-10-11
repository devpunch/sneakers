import {useEffect, useState} from "react";
import {Route} from "react-router-dom";
import axios from "axios";
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";
import {Home} from "./pages/Home";
import {Favorites} from "./pages/Favorites";
import AppContext from "./context";
import {Orders} from "./pages/Orders";


const App = () => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cardOpened, setCardOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([
          axios.get("https://61543c7d2473940017efad0a.mockapi.io/items"),
          axios.get("https://61543c7d2473940017efad0a.mockapi.io/cart"),
          axios.get("https://61543c7d2473940017efad0a.mockapi.io/favorites")
        ])

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных :(');
        console.error(error)
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://61543c7d2473940017efad0a.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems(prev => [...prev, obj]);
        const {data} = await axios.post("https://61543c7d2473940017efad0a.mockapi.io/cart", obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        }))
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину");
      console.error(error);
    }
  };

  const onRemoveItem = async (id) => {
    try {
      await axios.delete(`https://61543c7d2473940017efad0a.mockapi.io/cart/${id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert("Ошибка при удалении из корзины");
      console.error(error);
    };
  }

  const onAddFavorite = async (obj) => {
    try {
      const findFavorite = favorites.find((favObj) => Number(favObj.id) === Number(obj.id))
      if (findFavorite) {
        await axios.delete(`https://61543c7d2473940017efad0a.mockapi.io/favorites/${findFavorite.id}`);
        setFavorites(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
      } else {
        setFavorites((prev) => [...prev, obj]);
        const {data} = await axios.post('https://61543c7d2473940017efad0a.mockapi.io/favorites', obj);
        setFavorites((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        }))
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }
  const isFavoritesAdded = (id) => {
    return favorites.some(obj => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{items, cartItems, isItemAdded, isFavoritesAdded, favorites, setCardOpened, setCartItems, onAddFavorite}}>
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCardOpened(false)}
          onRemove={onRemoveItem}
          opened={cardOpened}
        />

        <Header onClickCard={() => setCardOpened(true)}/>

        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddFavorite={onAddFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/favorites">
          <Favorites/>
        </Route>
        <Route path="/orders">
          <Orders/>
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
