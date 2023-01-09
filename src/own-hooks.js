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

// * Создание собственных хуков.

const usePlanetInfo = (id) => {
    // Если перед ф-ией "use", то реакт воспринимает ее как хук.
    const [name, setName] = useState(null);

    useEffect(() => {
        let cancelled = false;
        fetch(`https://swapi.dev/api/planets/${id}`)
            .then((res) => res.json())
            .then((data) => !cancelled && setName(data.name));
        return () => (cancelled = true);
    }, [id]);

    return name;
};

const PlanetInfo = ({ id }) => {
    // Этому компоненту теперь не важно, откуда данные, он их только отображает, получив актуальное значение через props по id.
    // Такое переиспользование кода - это альтернатива использования HOC.
    const name = usePlanetInfo(id);

    return (
        <div>
            {id} - {name}
        </div>
    );
};

// * Сравни как было без создания хука usePlanetInfo.

// const PlanetInfo = ({ id }) => {

//     const [name, setName] = useState(null);
//     let cancelled = false;

//     useEffect(() => {
//         fetch(`https://swapi.dev/api/planets/${id}`)
//             .then((res) => res.json())
//             .then((data) => !cancelled && setName(data.name));
//         return () => (cancelled = true);
//     }, [id]);

//     return (
//         <div>
//             {id} - {name}
//         </div>
//     );
// };

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
