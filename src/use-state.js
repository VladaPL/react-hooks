import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  return (
    <div>
      <HookSwitcher/>
      {/* <Person/> */}
    </div>
  );
};

// useState можно вызывать несколько раз и работать с несколькими частями стейта.
// если сотояние зависит от предыдущего, то передаем ф-ию (где аргумент текущий стейт), по аналогии с setState


const HookSwitcher = () => {

  const [color, setColor] = useState('pink'); // useState возвращает массив, в котором вторым элементом выступает ф-ия изменяющая состояние
  const [fontSize, setFontSize] = useState(20);
  return (
    <div style={{padding: '10px', background: color, fontSize: `${fontSize}px`}}>
      <button onClick={() => setColor('grey')}>DARK</button>
      <button onClick={() => setColor('pink')}>LIGHT</button>
      <button onClick={()=> setFontSize((s) => s + 2)}>Font size + 2</button>
      Hello world!
    </div>
  );
};


// Второе отличие hooks:
// Если используем объект аргументом в useState,
// то при изменении состояния, объект перезапишется и будет иметь только те свойства, которые мы передали.
// Чтобы остальные свойства стейта сохранились нужно использовать оператор ... и заменить конкретное свойство
// Пример: 

const Person = () => {
  const [person, setPerson] = useState({
    firstName: 'Jon',
    lastName: 'Ivanov'
  });
  
  setPerson((person) => {
    return {...person, firstName: 'Ben'}; // деструктуризация - собираем все поля объекта person и заменяем одно на 'Ben'
  });
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
