import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

// Приложение для проверки всех методов жизненного цикла
// Счетчик - componentDidUpdate -> компонент обновился
// Скрываем счетчик - componentWillUnmount -> 
// Показываем счетчик - componentDidMount -> компонент впервые появился на странице

// Это важно понимать, так как ф-ия useEffect вызывается,
// когда срабатывает componentDidUpdate и componentDidMount.
// useEffect ф-ия зависящая от данных, запусткается каждый раз, когда набор данных меняется.


const App = () => {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(true);


  if (visible) {
    return (
      <div>
        <button onClick={() => setValue((v) => v + 1)}>
          Increase by one
        </button>
        <button onClick={() => setVisible(false)}>
          Hide
        </button>
        <ClassCounter value={value}/>
        <HookCounter value={value}/>
      </div>
    );
  } else {
      return <button onClick={() => setVisible(true)}>Show</button>
  }

};

// useEffect регистрирует ф-ию, у которой могут быть побочные эффекты.

const HookCounter = ({value}) => {
  useEffect(() => {
    console.log('побочный эффект')

    return () => console.log('clear'); // Если вернуть ф-ию то будет очистка предыдущего эффекта.
  }, [value]); 
  // Если передано значение в массиве вторым аргументом, то ф-ия вызывается только при его изменении.
  // Если аргумент пустой массив, то ф-ия вызывается только один раз и не зависит от данных.
  return <p>value</p>;
};

class ClassCounter extends Component {

  componentDidMount() {
    console.log('class: mount')
  }

  componentDidUpdate(props) {
    console.log('class: update')
  }

  componentWillUnmount() {
    console.log('class: unmount')
  }

  render() {
    return <p>{this.props.value}</p>
  }

}





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);