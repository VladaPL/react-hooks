import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';

const MyContext = React.createContext(); // для создания контекста

// Провайдер предоставляет значение контекста всем компонентам ниже по иерархии

const App = () => {

  return (
    <MyContext.Provider value={'Hello world 12345'}>
        <Child/>
    </MyContext.Provider>
  );
};

// При использовании хука меням только код в чаилд

const Child = () => {
  const value = useContext(MyContext); // Передаем аргументом именно объект-контекст MyContext, а не Consumer.

    return <p>{value}</p>;
};




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);