## Решение первой задачи
```
const getObjectProperty = (obj, path, defaultValue) => {
     const pathArray = path.split('.'),
         pathLevel = pathArray[0],
         objKeys = Object.keys(obj),
         currentKey = objKeys.indexOf(pathLevel),
         objValues = Object.values(obj)[currentKey]
     if (currentKey === -1) return defaultValue
     else if (currentKey !== -1 && pathArray.length === 1) return objValues
     else {
         pathArray.shift()
         return getObjectProperty(objValues, pathArray.join('.'), defaultValue)
     }
 }
 
 const obj = {
     'pupa': {
         'lupa': {
             'beep': 'boop',
         },
         'foo': 'bar',
     },
 };
 
 getObjectProperty(obj, "pupa.lupa"); // > { beep : 'boop' }
 getObjectProperty(obj, "pupa.lupa.beep"); // > 'boop'
 getObjectProperty(obj, "pupa.foo"); // > 'bar'
 getObjectProperty(obj, "pupa.ne.tuda"); // > undefined
 getObjectProperty(obj, "pupa.ne.tuda", true); // > true
 getObjectProperty(obj, "pupa.ne.tuda", "Default value"); // > 'Default value'`
```

## [Решение второй задачи](https://artkagr.github.io/kode-test)

### Декомпозиция задач:
* Инициализация проекта - 1 час
    * Create React App
    
* Настройка зависимостей - 1 час
    * SCSS
    * axios
    * react-router-dom
    
* Создание архитектуры приложения - 20 часов
    * Компоненты:
        * авторизации (Login)
        * ввода одноразового пароля (OneTimePassword)
        * заголовка (Header)
        * пагинации (Pagination)
        * вывода списка карточек, фильтрации карточек, заголовка (CardsTable)
        * вывода информации о выбранной карточке (CurrentCard)
        * карточки (CardObject)    
    * Стилизация компонентов - 4 часа  
* Подключение к публичному API в компонентах, сохранение и вывод данных - 4 часа
* Деплой проекта - 1 час

### Сложности, возникшие в процессе:
* Главной сложностью можно считать опыт работы с React (6 дней в 2020 году
и 3 дня в 2019 году на решение данного тестового задания первой версии)
* Невозможно настроить headers для запросов к публичному API (других способов
поменять количество передаваемых на клиент карт в документации не обнаружил)
* Нетривиальный способ настройки роутинга (в компоненте вывода информации о выбранной карте
(из-за небольшого опыта работы с React) пришлось обратиться к URL через ```window.location.href```)
* Не сразу пришло озорение как не терять контекст функции в событиях, используя функцию высшего порядка при отрисовке
компонента. Стрелочная функция оказалась тем самым счастливым решением.
* Не успел разобраться с функциональными компонентами и React Hooks.
* При фильрации по типу блокируется фильтр подтипов и наоборот. Также невозможно
применить фильтры при нахождении не на первой странице. Таким образом избежал
проблем с пагинацией и структурой параметров.

### Решённые задачи со звёздочкой:
 - [X] Компонент «Селект категорий» написан самостоятельно
 - [X] Пагинация карточек
 - [ ] Любые анимации интерфейса
 - [ ] Быстрый просмотр покемона в модальном окне по клику на карточку
 - [X] Сохранение сессии авторизованного пользователя после закрытия вкладки браузера. Например, через local storage браузера
 - [ ] Адаптивный дизайн




