import "./App.css";
import { useEffect, useState } from "react";
import { Radio } from "./components/Radio";
import breadData from "./assets/bread-data.json";
import BreadItem from "./components/BreadItem.js";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

function App() {
  const [byTaste, setByTaste] = useState("all");
  const [byDiet, setByDiet] = useState([]);
  const [sortBy, setSortBy] = useState("tier");

  //agreggator/////////////////////////////////////////
  const [favoritesToggle, setFavoritesToggle] = useState(false);
  const [total, setTotal] = useState(0.0);
  const [FavoritesData, setFavoritesData] = useState([]);

  const [toggle, setToggle] = useState(new Array(breadData.length).fill(false));
  const [buttonClass, setButtonClass] = useState(
    new Array(breadData.length).fill("Add")
  );
  const [buttonDisplay, setButtonDisplay] = useState(
    new Array(breadData.length).fill("Add to would-eat-right-now list")
  );

  const handleFavs = (item) => {
    setFavoritesToggle(!favoritesToggle);
  };

  function AddToFavorite(item) {
    setFavoritesData([...FavoritesData, item]);
  }
  // useEffect(() => {
  //   console.log(FavoritesData);
  // }, [FavoritesData]);

  function RemoveFromFavorite(item) {
    setFavoritesData(FavoritesData.filter((a) => a !== item));
  }
  useEffect(() => {
    console.log(FavoritesData);
    console.log(toggle);
    console.log(buttonDisplay);
    console.log(buttonClass);
  }, [FavoritesData, toggle, buttonDisplay, buttonClass]);

  function addTotal(item) {
    setTotal(Math.round((total + item + Number.EPSILON) * 100) / 100);
  }
  function subtractTotal(item) {
    setTotal(Math.round((total - item + Number.EPSILON) * 100) / 100);
  }

  function FavoritesButton(item) {
    function handleClass(index, string) {
      const nextClasses = buttonClass.map((c, i) => {
        if (i === item.id) {
          return string;
        } else {
          return c;
        }
      });
      setButtonClass(nextClasses);
    }

    function handleButtonDisplay(index, string) {
      const nextButtons = buttonDisplay.map((c, i) => {
        if (i === item.id) {
          return string;
        } else {
          return c;
        }
      });
      setButtonDisplay(nextButtons);
    }

    function updateButtonDisplay(item) {
      if (buttonClass[item.id] === "Add") {
        handleClass(item.id, "Remove");
        handleButtonDisplay(item.id, "Remove from would-eat-right-now list");
        AddToFavorite(item);
        addTotal(item.rating);
      } else {
        handleClass(item.id, "Add");
        handleButtonDisplay(item.id, "Add to would-eat-right-now list");
        RemoveFromFavorite(item);
        subtractTotal(item.rating);
      }
    }
    function handleToggle(id) {
      const toggleUpdate = toggle.map((c, i) => {
        if (i === id) {
          return !toggle[id];
        } else {
          return c;
        }
      });
      setToggle(toggleUpdate);
      updateButtonDisplay(item);
    }

    return (
      <div>
        <button
          className={buttonClass[item.id]}
          onClick={() => handleToggle(item.id)}
        >
          {buttonDisplay[item.id]}
        </button>
      </div>
    );
  }

  function BreadList() {
    const zero = getFavoriteBreads(breadData);

    const first = getTasteFilteredBreads(zero);

    const second = getDietFilteredBreads(first);

    const third = getSortedBreads(second);

    return (
      <div className="grid">
        {third.map((item) => (
          <div>
            <div>
              <BreadItem item={item}></BreadItem>
              {FavoritesButton(item)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function getFavoriteBreads(breads) {
    if (favoritesToggle === true) {
      console.log(FavoritesData);
      // console.log(breads.filter((x) => FavoritesData[x.id] === true));
      return FavoritesData;
    } else {
      return breads;
    }
  }

  function getTasteFilteredBreads(breads) {
    if (byTaste === "all") {
      const filtered = [...breads];
      return filtered;
    } else {
      const filtered = breads.filter((item) =>
        item.taste === byTaste ? true : false
      );
      return filtered;
    }
  }

  function getDietFilteredBreads(breads) {
    if (byDiet.length === 0) {
      const filtered = [...breads];
      return filtered;
    } else {
      let checker = (arr, target) => target.every((v) => arr.includes(v));

      const filtered = breads.filter((item) =>
        checker(item.diet, byDiet)
          ? //does item.diet include byDiet?
            true
          : false
      );
      console.log(filtered);
      return filtered;
    }
  }

  function getSortedBreads(breads) {
    var filtered;
    if (sortBy === "tier") {
      filtered = breads.sort((a, b) =>
        TierList[a.tier] > TierList[b.tier] ? 1 : -1
      );
    } else if (sortBy === "rating") {
      filtered = breads.sort((a, b) => (a.rating < b.rating ? 1 : -1));
    } else {
      filtered = breads.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }

  function handleTasteChange(newTaste) {
    setByTaste(newTaste);
  }

  function handleDietChange(newDiet) {
    if (byDiet.includes(newDiet[0])) {
      setByDiet(byDiet.filter((x) => x !== newDiet[0]));
    } else {
      setByDiet([...byDiet, newDiet[0]]);
    }
    console.log(byDiet);
  }

  function handleSortChange(newSort) {
    setSortBy(newSort);
  }

  //for custom sort order
  const TierList = {
    //S A B C D E F
    S: 1,
    A: 2,
    B: 3,
    C: 4,
    D: 5,
    E: 6,
    F: 7,
  };

  //checkbox/////////////////////////////////////////////////////
  const handleFilters = (filters) => {
    const newFilters = filters.map((x) => dietList[x]);

    handleDietChange(newFilters);
  };

  function DietCheckbox(props) {
    const handleToggle = (name) => {
      if (byDiet.includes(name)) {
        setByDiet(byDiet.filter((x) => x !== name));
      } else {
        setByDiet([...byDiet, name]);
      }
      console.log(byDiet);
    };

    return (
      <FormGroup>
        {dietKey.map((value, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                onChange={() => handleToggle(value.name)}
                checked={byDiet.includes(value.name) ? true : false}
              />
            }
            label={value.name}
          />
        ))}
      </FormGroup>
    );
  }

  const dietKey = [
    { id: 1, name: "egg-free" },
    { id: 2, name: "dairy-free" },
    { id: 3, name: "gluten-free" },
    { id: 4, name: "nut-free" },
  ];

  const dietList = {
    1: "egg-free",
    2: "dairy-free",
    3: "gluten-free",
    4: "nut-free",
  };

  return (
    <div>
      <section className="layout">
        <div>
          <h1>ULTIMATE BREADS RANKED</h1>
          <h2>Bread Lover</h2>
          <div>
            subjective tiers and ranks of breads or ~breadlike things i've
            tried. The aggregator adds up ratings of favorited breads. Feel free
            to try and match my perfect bread list (the aggregated rating for my
            perfect bread list is:[still calculating this]):)
          </div>
        </div>
      </section>

      <div className="Compartment">
        <div className="Sidebar">
          <div>
            <div>
              <div>Sort By:</div>
              <div className="SortOptions">
                <Radio
                  value="tier"
                  selected={sortBy}
                  text="by tier"
                  onChange={handleSortChange}
                />
                <Radio
                  value="rating"
                  selected={sortBy}
                  text="by rating"
                  onChange={handleSortChange}
                />
                <Radio
                  value="alpha"
                  selected={sortBy}
                  text="alphabetically"
                  onChange={handleSortChange}
                />
              </div>
            </div>
            <div>Taste</div>
            <div className="SortOptions">
              <Radio
                value="all"
                selected={byTaste}
                text="all"
                onChange={handleTasteChange}
              />
              <Radio
                value="sweet"
                selected={byTaste}
                text="sweet"
                onChange={handleTasteChange}
              />
              <Radio
                value="savory"
                selected={byTaste}
                text="savory"
                onChange={handleTasteChange}
              />
              <Radio
                value="versatile"
                selected={byTaste}
                text="versatile"
                onChange={handleTasteChange}
              />
            </div>
            <div>Dietary Restrictions</div>
            <div className="SortOptions">
              <DietCheckbox
                handleFilters={(filters) => handleFilters(filters)}
              />
            </div>
            <div>Favorites</div>
            <div className="SortOptions">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => handleFavs()}
                      // checked={byDiet.includes(value.name) ? true : false}
                    />
                  }
                  label={"would-eat-right-now rating:"}
                />
              </FormGroup>
              {total}
            </div>
          </div>
        </div>

        <section>
          <h2>Top Breads</h2>
          {BreadList()}
        </section>
      </div>
    </div>
  );
}

export default App;

{
  //// S 1 A B C D E F
  /* <div>
            <h2>dutch crunch</h2>
            <div> cronch is sweet sf attack on tastebuds</div>
          </div>
          <div>
            <h2>durum</h2>
            <div> the most flavorful basic of all time</div>
          </div>
          <div>
            <h2>challah</h2>
            <div> crying in rhode island rn</div>
          </div>
          <div>
            <h2>raisin cinnamon</h2>
            <div> a lil fruity</div>
          </div>
          <div>
            <h2>steamed bun</h2>
            <div> steamy steamy reminds me of my mom</div>
          </div>
          <div>
            <h2>sourdough</h2>
            <div>
              {" "}
              a lil tang sour but not too much tang for me please n lots of
              fluff required
            </div>
          </div>
          <div>
            <h2>pumpernickel</h2>
            <div>
              {" "}
              "I have a bread and it's called pumpernickel Yum, yum,
              pumpernickel, pumpernickel bread" - Barney, 2000
            </div>
          </div>
          <div>
            <h2>bagel</h2>
            <div> chompy, good with anything</div>
          </div>
          <div>
            <h2>crispbread</h2>
            <div>
              {" "}
              The crouton no one asked for. holds up to anything. a clean slate.
            </div>
          </div>
          <div>
            <h2>croissant</h2>
            <div>
              {" "}
              i will say i respect a good, fresh croissant, but it doesn't mean
              i like them. I don't like the milky flavor and when the flakes no
              longer cronch, they just kinda taste oily-soggy
            </div>
          </div>
          <div>
            <h2>frybread</h2>
            <div>
              {" "}
              happy traditions :) almost threw up in the car from the amount of
              oil though.
            </div>
          </div>
          <div>
            <h2>melon melon pan</h2>
            <div>
              {" "}
              tbh any soft chompy bread with a layer of crispy cookie is up
              there. but melon flavored?? +5 :D
            </div>
          </div>
          <div>
            <h2>salt bread</h2>
            <div>
              {" "}
              typa butter dough i like - not too enriched so not too much milky
              flavor in the dough itself, the butter gets to be its own star
            </div>
          </div>
          <div>
            <h2>parotta</h2>
            <div> ahhh [that meme of that guy rubbing his face]</div>
          </div>
          <div>
            <h2>focaccia</h2>
            <div> chefs kiss</div>
          </div>
          <div>
            <h2>ciabatta</h2>
            <div> the best when you need somethin toasty</div>
          </div> */
}
