import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
    const [value, setValue] = useState(0);
    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div>
                <button onClick={() => setValue((v) => v + 1)}>
                    Увеличить значение на единицу
                </button>
                <button onClick={() => setVisible(false)}>Скрыть элементы</button>
                <ClassCounter value={value} />
                <HookCounter value={value} />
                <Notification />
            </div>
        );
    } else {
        return <button onClick={() => setVisible(true)}>Показать элементы</button>;
    }
};

// useEffect регистрирует ф-ию, у которой могут быть побочные эффекты.

const HookCounter = ({ value }) => {
    // 1) Создадим ф-ию, которая вызовется только один раз при создании компонента (имитация componentDidMount)
    useEffect(() => console.log("mount"), []); // передаем пустой массив вторым аргументом

    // 2) Создадим ф-ию, которая вызовется при обновлении компонента
    // Примечание: имитация componentDidUpdate, только DidUpdate не вызывается, когда создан первый раз, в отличии от useEffect
    useEffect(() => console.log("update")); // не передаем массив в качесве второго аргумента

    // 3) Создадим ф-ию, которая вызовется при размонтировнии компонента (componentWillUnMount)
    useEffect(() => () => console.log("unmount"), []); // Если вернуть ф-ию то будет очистка предыдущего эффекта.

    // Примечание: запись третьего варианта для очистки используется редко, чаще встречается это:
    // useEffect(() => {
    //     console.log('mount');
    //     return () => console.log('unmount');
    // }, []);

    return <p>Обрати внимание, как работает useEffect в консоли.</p>;
};

class ClassCounter extends Component {
    render() {
        return <p>{this.props.value}</p>;
    }
}

// 4) effect + cleanup ( mount + unmount)

const Notification = () => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout(timeout); // возврат предотвращает утечку памяти
    }, []);

    return <div>{visible && <p>Это сообщение пропадет через 3 секунды!</p>}</div>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
