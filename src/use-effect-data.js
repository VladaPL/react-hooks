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

// Promise нельзя отменить, но можно проигнорировать результат.

const PlanetInfo = ({ id }) => {
    const [name, setName] = useState(null);
    // Для обхода ситуации race condition, используем такой способ очистки useEffect:
    let cancelled = false; // Показывает нужно выполнять действие, или нужно игнорировать его.
    useEffect(() => {
        fetch(`https://swapi.dev/api/planets/${id}`)
            .then((res) => res.json())
            .then((data) => !cancelled && setName(data.name)); // если cancelled = false, то выполняем setName
        return () => (cancelled = true); // ф-ия, очистки эффекта
    }, [id]);

    // Таким образом, если значение от сервера не успеет дойти к моменту следующего переключения id,
    // то это значение не будет выводиться. Сам запрос не отменяется, но вывода данных не будет.

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
