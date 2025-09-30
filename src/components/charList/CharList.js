import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import img from "../errorMessage/error.gif";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
  state = {
    characters: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 0,
    charEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    this.setState(({ offset, characters }) => ({
      characters: [...characters, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  renderItems(arr) {
    const problemUrl =
      "https://www.wallpaperflare.com/static/264/707/824/iron-man-the-avengers-robert-downey-junior-tony-wallpaper.jpg";
    const characterItems = arr.map((item) => {
      if (!item || typeof item !== "object") return null;
      const thumbnail = item.thumbnail === problemUrl ? img : item.thumbnail;
      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => this.props.onCharSelected(item.id)}
        >
          <img src={thumbnail} alt={item.name} className="char__img" />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{characterItems}</ul>;
  }

  render() {
    const { characters, loading, error, offset, newItemLoading, charEnded } =
      this.state;
    const items = this.renderItems(characters);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;
    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          onClick={() => this.onRequest(offset)}
          disabled={newItemLoading}
          style={{ display: charEnded ? "none" : "block" }}
          className="button button__main button__long"
        >
          <div className="inner">Load more</div>
        </button>
      </div>
    );
  }
}
export default CharList;
