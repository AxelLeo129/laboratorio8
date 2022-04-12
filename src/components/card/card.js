import React from "react";
import star from "../../assets/img/star.webp";
import './card.css';

const Card = (props) => {
  return (
    <React.Fragment>
      <div className="grid--item">
        <div className="main--container">
          <div
            className="card--container"
            style={props.card.style}
            onClick={() => props.flipCard(props.index)}
          >
            <div className="front">
              <img className="star--img" src={star} />
            </div>
            <div className="back">
              <img className="star--img" src={props.card.img} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
