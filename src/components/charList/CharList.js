import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types"; // ES6

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import img from "../errorMessage/error.gif";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

const CharList = (props) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);
  const [selectedCharId, setSelectedCharId] = useState(null);

  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = (offset) => {
    onCharListLoading();
    marvelService
      .getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(onError);
  };

  const onCharListLoading = () => {
    setNewItemLoading(true);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    setCharacters(() => [...characters, ...newCharList]);
    setLoading(false);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const charactersRefs = useRef([]);

  const focusOnItem = (id) => {
    charactersRefs.current.forEach((character) =>
      character.classList.remove("char__item_selected")
    );
    charactersRefs.current[id].classList.add("char__item_selected");
    charactersRefs.current[id].focus();
  };

  const onSelectedCharId = (id) => {
    setSelectedCharId(id);
    props.onCharSelected(id);
  };

  function renderItems(arr) {
    const problemUrl =
      "https://www.wallpaperflare.com/static/264/707/824/iron-man-the-avengers-robert-downey-junior-tony-wallpaper.jpg";
    const characterItems = arr.map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const thumbnail = item.thumbnail === problemUrl ? img : item.thumbnail;
      return (
        <li
          className="char__item"
          tabIndex={0}
          key={item.id}
          ref={(el) => (charactersRefs.current[index] = el)}
          onClick={() => {
            onSelectedCharId(item.id); focusOnItem(index);
          }}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              props.onCharSelected(selectedCharId);
              focusOnItem(index);
            }
          }}
        >
          <img src={thumbnail} alt={item.name} className="char__img" />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{characterItems}</ul>;
  }
  const items = renderItems(characters);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;
  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}
      <button
        onClick={() => onRequest(offset)}
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        className="button button__main button__long"
      >
        <div className="inner">Load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};
export default CharList;
