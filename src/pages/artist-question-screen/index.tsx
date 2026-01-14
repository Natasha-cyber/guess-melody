import {ChangeEvent} from 'react';
import {Helmet} from 'react-helmet-async';

import Logo from '../../components/logo';
import {QuestionArtist, UserArtistQuestionAnswers} from '../../types/question';

type ArtistQuestionScreenProps = {
  question: QuestionArtist;
  onAnswer: (question: QuestionArtist, answers: UserArtistQuestionAnswers) => void;
  renderPlayer: (src: string, id: number) => JSX.Element;
};

function ArtistQuestionScreen({question, onAnswer, renderPlayer}: ArtistQuestionScreenProps) {
  const {answers, song} = question;

    return (
        <section className="game game--artist">
        <Helmet>
          <title>Угадай мелодию. Кто исполняет эту песню?</title>
        </Helmet>
        <header className="game__header">
          <Logo />

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle 
                className="timer__line" 
                cx="390" 
                cy="390" 
                r="370" 
                style={{filter: 'url(#blur)', transform: 'rotate(-90deg) scaleY(-1)', transformOrigin: 'center'}} 
            />
          </svg>

          <div className="game__mistakes">
            <div className="wrong"></div>
            <div className="wrong"></div>
            <div className="wrong"></div>
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Кто исполняет эту песню?</h2>
          <div className="game__track">
            <div className="track">
              {renderPlayer(song.src, 0)}
            </div>
          </div>

          <form className="game__artist">
            {
              answers.map((answer, id) => {
                const {artist, picture} = answer;
                const keyValue = artist;
                
                  return (
                    <div className="artist" key={keyValue}>
                      <input 
                        className="artist__input visually-hidden" 
                        type="radio" 
                        name="answer" 
                        value={`artist-${id}`}
                        id={`artist-${id}`}
                        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                          evt.preventDefault();
                          onAnswer(question, artist);
                        }} 
                      />
                      <label className="artist__name" htmlFor={`artist-${id}`}>
                        <img className="artist__picture" src={picture} alt={artist}/>
                        {artist}
                      </label>
                    </div>
                  )
              })
            }
          </form>
        </section>
      </section>
    )
}

export default ArtistQuestionScreen;