import React, {
    Component,
    useEffect,
    useState,
    useCallback,
    useMemo,
} from "react";
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

// *  Тема: Рефакторинг кода own-hooks. useCallback and useMemo.

// useCallback() - сохраняет ф-ию между вызовами, если данные в массиве зависимостей не изменились.
// useMemo() - работает также, но для значений.

// f - функция из первого аргумента
// const f = useCallback(() => loadData(id), [id]);

// v - результат функции из первого аргумента
// const v = useMemo(() => getValue(id), [id]);

// 1) разделим usePlanetInfo на компонент для получения данных с сервера и

const getPlanet = (id) => {
    return fetch(`https://swapi.dev/api/planets/${id}`)
        .then((res) => res.json())
        .then((data) => data);
};

const useRequest = (request) => {
    // аргумент request - это ф-ия, которая возвращает промис.

    const initialState = {
        data: null,
        loading: true,
        error: null,
    };

    const [dataState, setDataState] = useState(initialState);

    useEffect(() => {
        setDataState(initialState);
        let cancelled = false;
        request()
            .then(
                (data) =>
                    !cancelled &&
                    setDataState({ data, loading: false, error: null })
            )
            .catch(
                (error) =>
                    !cancelled &&
                    setDataState({
                        data: null,
                        loading: false,
                        error,
                    })
            );
        return () => (cancelled = true);
    }, [request]);

    return dataState;
};

// Каждый раз когда мы вызываем usePlanetInfo запрос создается заново.
// Чтобы исправить это, нужно использовать useCallback.
// Проверить количество отправляемых на сервер запросов можно через владку Network Devtools.

const usePlanetInfo = (id) => {
    const request = useCallback(() => getPlanet(id), [id]);
    return useRequest(request);
};

const PlanetInfo = ({ id }) => {
    const { data, loading, error } = usePlanetInfo(id);

    if (error) {
        return <div>Что-то пошло не так...</div>;
    }

    if (loading) {
        return <div>Идет заграузка данных...</div>;
    }

    return (
        <div>
            {id} - {data.name}
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
