import { useState, useEffect, useCallback } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
  const [char, setChar] = useState({});

  const { loading, error, getCharacter, clearError } = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = useCallback(() => {
    clearError();
    const id = Math.floor(Math.random() * 20);
    getCharacter(id).then(onCharLoaded);
  }, [clearError, getCharacter]);

  useEffect(() => {
    updateChar();
  }, [updateChar]);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <Static updateChar={updateChar} />
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

const Static = ({ updateChar }) => {
  return (
    <div className="randomchar__static">
      <p className="randomchar__title">
        Random character for today!
        <br />
        Do you want to get to know him better?
      </p>
      <p className="randomchar__title">Or choose another one</p>
      <button onClick={updateChar} className="button button__main">
        <div className="inner">try it</div>
      </button>
      <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
    </div>
  );
};

export default RandomChar;
