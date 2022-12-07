import React from 'react';
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

const Child = () => {
    return (
        <MyContext.Consumer>
            {
                (value) => {
                    return (<p>{value}</p>)
                }
            }
        </MyContext.Consumer>
    );
};




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);