import "./App.css";
import { useEffect, useState } from "react";
import { Radio } from "./components/Radio";
import breadData from "./assets/bread-data.json";
import BreadItem from "./components/BreadItem.js";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material";

function App() {
  const initialTaste = "all";
  const initialDiet = [];
  const [byTaste, setByTaste] = useState(initialTaste);
  const [byDiet, setByDiet] = useState(initialDiet);
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

  function handleReset() {
    setByTaste(initialTaste);
    setByDiet(initialDiet);
  }
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
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
            // fontSize: "16px",
          }}
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
          <div className="card">
            <BreadItem item={item}></BreadItem>
            <div className="favButton">{FavoritesButton(item)}</div>
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
    "S+": 1,
    S: 2,
    "S-": 3,
    "A+": 4,
    A: 5,
    "A-": 6,
    "B+": 7,
    B: 8,
    "B-": 9,
    "C+": 10,
    C: 11,
    "C-": 12,
    "D+": 13,
    D: 14,
    "D-": 15,
    "E+": 16,
    E: 17,
    "E-": 18,
    "F+": 19,
    F: 20,
    "F-": 21,
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
                size="small"
                sx={{
                  color: "rgb(208, 222, 193)",
                  padding: 0,
                  paddingLeft: 1.5,
                  paddingRight: 0.25,
                  "&.Mui-checked": {
                    color: "rgb(111, 150, 111)",
                  },
                }}
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
          <div className="Description">
            subjective tiers and ranks of breads or ~breadlike things i've
            tried. The aggregator adds up ratings of user-favorited breads. Feel
            free to try and match my perfect bread list (the aggregated rating
            for my perfect bread list is currently: 4598). Some may think that
            these ratings are harsh, but i would like to remind that this list
            is TOP TIER, best of the best/memorable experiences/i've been dogged
            into including them.
          </div>
        </div>
      </section>

      <div className="Compartment">
        <div className="Sidebar">
          <div>
            <div>Sort:</div>
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
          <div>
            <div>Taste:</div>
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
          </div>
          <div>
            <div>Dietary Restrictions:</div>
            <div className="SortOptions">
              <DietCheckbox
                handleFilters={(filters) => handleFilters(filters)}
              />
            </div>
          </div>
          <button onClick={handleReset}>RESET FILTERS</button>
          <div className="SortOptions">
            <FormGroup sx={{ paddingTop: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      color: "rgb(208, 222, 193)",
                      padding: 0,
                      paddingLeft: 0,
                      paddingRight: 0.25,
                      "&.Mui-checked": {
                        color: "rgb(111, 150, 111)",
                      },
                    }}
                    onChange={() => handleFavs()}
                  />
                }
                label={"Favorites"}
              />
            </FormGroup>
            <FormHelperText>would-eat-right-now rating: {total}</FormHelperText>
            {/* <div> would-eat-right-now rating: {total}</div> */}
          </div>
        </div>

        <section className="Breads">
          {/* <h2>Top Breads</h2> */}
          {BreadList()}
        </section>
      </div>
    </div>
  );
}

export default App;
