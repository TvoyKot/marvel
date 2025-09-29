import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import img from "../errorMessage/error.gif";
import MarvelService from "../../services/MarvelService";
import { v4 as uuidv4 } from "uuid";

import "./charList.scss";

class CharList extends Component {
  state = {
    characters: [],
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharListLoaded)
      .catch(this.onError);
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };
  
  onCharListLoaded = (charList) => {
    const charWidthID = charList.map((item) => ({ ...item, id: uuidv4() }));
    this.setState({
      characters: charWidthID,
      loading: false,
    });
  };



  renderItems(arr) {
    const problemUrl =
      "https://www.wallpaperflare.com/static/264/707/824/iron-man-the-avengers-robert-downey-junior-tony-wallpaper.jpg";
    const characterItems = arr.map((item) => {
      const thumbnail = item.thumbnail === problemUrl ? img : item.thumbnail;
      return (
        <li className="char__item" key={item.id}>
          <img src={thumbnail} alt={item.name} className="char__img" />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{characterItems}</ul>;
  }

  render() {
    const { characters, loading, error } = this.state;
    const items = this.renderItems(characters);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;
    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">Load more</div>
        </button>
      </div>
    );
  }
}
export default CharList;
