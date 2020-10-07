import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forEachTrailingCommentRange, getEffectiveTypeRoots } from 'typescript';
import { store } from './redux/actionCreators';
import { addTile,clickTile } from './redux/actionCreators';
import './App.css';


const Tile = ({coordinate}) => {
  const dispatch = useDispatch();
  const allTiles = useSelector(store => store.TileBoard);
  
  function handleClick () {
    dispatch(clickTile(coordinate.identity))
  }

  const images = require.context('./pictures', true);
  return (
    <div onClick={handleClick} className="Tile" style ={{border: "solid 2px black", backgroundColor: "lightskyblue"}}>
      <img style={{height: "250px", width: "250px", display:"grid",padding:"0", opacity: coordinate.on}} src={images('./' + coordinate.identity + '.jpg')}/>
    </div>
  )
}

const Board = () => {
  
  const allTiles = useSelector(store => store.TileBoard);
  
  
  return (
    <div style={{display:"grid", gridTemplateColumns:"auto auto auto", width:"750px", margin:"0 auto"}}>
      {allTiles.map(eachTile => {
      return <Tile key={eachTile.identity} coordinate={eachTile}></Tile>
      })}
    </div>
  ) 
}

function App() {
 
  const dispatch = useDispatch();
  const pusheens = ['02','12','22','01','11','21','00','10','20']
  pusheens.map(pusheen => {
    dispatch(addTile(pusheen))
  })
  
  return (
    <div className="App">
      <h1 style={{textAlign: "center"}}>Lights On Pusheen!</h1>
      <br></br>
      <Board></Board>
    </div>
  );
}

export default App;
