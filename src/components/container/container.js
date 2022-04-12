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
  const [id_selected, setIdSelected] = useState(null);
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
    const grid_copy = [...grid];
    if (grid_copy[index].id != id_selected && !grid_copy[index].paried && flip) {
      setFlip(false);
      grid_copy[index].style = { transform: "rotateY(180deg)" };
      setGrid(grid_copy);
      if (count == 0) {
        setCount(1);
        setIdSelected(grid_copy[index].id);
        setFlip(true);
      } else {
        setTurno(turnos + 1);
        if (grid_copy[index].relate == id_selected) {
          setComplete(complete + 2);
          const index_pev = grid_copy.findIndex((e) => e.id == id_selected);
          grid_copy[index_pev].paried = true;
          grid_copy[index].paried = true;
          setGrid(grid_copy);
          setIdSelected(null);
          setCount(0);
          setFlip(true);
        } else {
          setTimeout(() => {
            const index_pev = grid_copy.findIndex((e) => e.id == id_selected);
            grid_copy[index_pev].style = null;
            grid_copy[index].style = null;
            setGrid(grid_copy);
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
