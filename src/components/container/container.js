import React, { useState, useEffect } from "react";
import { cards } from "../utilities/constants";
import Swal from "sweetalert2";
import Card from "../card/card";
import "./container.css";
import 'animate.css';

const Container = (props) => {
  const sortRandomArray = (array) => {
    let i, j, k;
    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * i);
      k = array[i];
      array[i] = array[j];
      array[j] = k;
    }
    return array;
  };

  const [grid, setGrid] = useState(sortRandomArray([...cards]));
  const [count, setCount] = useState(0);
  const [idSelected, setIdSelected] = useState(null);
  const [turnos, setTurno] = useState(0);
  const [complete, setComplete] = useState(0);
  const [flip, setFlip] = useState(true);

  useEffect(() => {
    if (complete == 16) {
      gameOver();
    }
  }, [complete]);

  const restartGame = () => {
    setTurno(0);
    setComplete(0);
    setIdSelected(null);
    setCount(0);
    setFlip(true);
    cards.forEach(e => {
      e.style = null;
      e.paried = false;
    });
    setGrid(sortRandomArray([...cards]));
  }

  const flipCard = (index) => {
    const gridCopy = [...grid];
    if (gridCopy[index].id != idSelected && !gridCopy[index].paried && flip) {
      setFlip(false);
      gridCopy[index].style = { transform: "rotateY(180deg)" };
      setGrid(gridCopy);
      if (count == 0) {
        setCount(1);
        setIdSelected(gridCopy[index].id);
        setFlip(true);
      } else {
        setTurno(turnos + 1);
        if (gridCopy[index].relate == idSelected) {
          setComplete(complete + 2);
          const indexPev = gridCopy.findIndex((e) => e.id == idSelected);
          gridCopy[indexPev].paried = true;
          gridCopy[index].paried = true;
          setGrid(gridCopy);
          setIdSelected(null);
          setCount(0);
          setFlip(true);
        } else {
          setTimeout(() => {
            const indexPev = gridCopy.findIndex((e) => e.id == idSelected);
            gridCopy[indexPev].style = null;
            gridCopy[index].style = null;
            setGrid(gridCopy);
            setCount(0);
            setIdSelected(null);
            setFlip(true);
          }, 1000);
        }
      }
    }
  };

  const gameOver = () => {
    Swal.fire({
      icon: "success",
      title: "Juego completado",
      text: "No. Turnos: " + turnos,
      confirmButtonText: "Aceptar",
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then(() => {
      restartGame();
    })
  };

  return (
    <React.Fragment>
      <h3>Turno No. {turnos}</h3>
      <div className="row">
        <div className="grid--container">
          {grid.map((e, index) => (
            <React.Fragment key={index}>
              <Card card={e} flipCard={flipCard} index={index} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Container;
