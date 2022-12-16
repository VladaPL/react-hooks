import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
    const [value, setValue] = useState(1);
    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div>
                <button onClick={() => setValue((v) => v + 1)}>
                    Увеличить значение на единицу
                </button>
                <button onClick={() => setVisible(false)}>
                    Скрыть элементы
                </button>
                <ClassCounter value={value} />
                <PlanetInfo id={value} />
            </div>
        );
    } else {
        return (
            <button onClick={() => setVisible(true)}>Показать элементы</button>
        );
    }
};

const PlanetInfo = ({ id }) => {
    const [name, setName] = useState(null);
    // В данном случае мы должны перезапускать useEffect, когда id изменился
    // Значит передаем вторым аргументом [id]
    useEffect(() => {
        fetch(`https://swapi.dev/api/planets/${id}`)
            .then((res) => res.json())
            .then((data) => setName(data.name));
    }, [id]);
// Данный код работает, но рассмотрим ситуацию race condition (ошибка проектирования многопоточной системы или приложения,
// при которой работа системы или приложения зависит от того, в каком порядке выполняются части кода).
// Такая ситуация возникает, когда мы переключили на следующую планету, не дождались ответа от сервера и продолжили переключать планеты.
// Получится два запроса, которые одновременно идут к серверу. 
// Таким образом, из-за задержек, компонет может отображать неправильные данные (не те, которые ожидает пользователь). То есть id от одной планеты, а название от другой.
// Как этого избежать, смотри в следующем коммите.
    return (
        <div>
            {id} - {name}
        </div>
    );
};

class ClassCounter extends Component {
    render() {
        return <p>{this.props.value}</p>;
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
