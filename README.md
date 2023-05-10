# appointment-calendar-carousal

React components for creating carousel based calendar appointments.

[![NPM version][npm]][npm-url]
[![Bundle size][size]][size-url]
[![Downloads][downloads]][downloads-url]

[npm]: https://img.shields.io/npm/v/appointment-calendar-carousal.svg
[npm-url]: https://www.npmjs.com/package/appointment-calendar-carousal
[size]: https://img.shields.io/bundlephobia/minzip/appointment-calendar-carousal
[size-url]: https://bundlephobia.com/package/appointment-calendar-carousal
[downloads]: https://img.shields.io/npm/dm/appointment-calendar-carousal.svg
[downloads-url]: https://www.npmjs.com/package/appointment-calendar-carousal

<br />
<a href="##quickstart">Quickstart</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#docs">Docs</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#license">License</a>
<br />
<hr />

## Quickstart

---

Install the library with peer dependencies:

```bash
# With yarn
yarn add appointment-calendar-carousal antd dayjs

# or with npm
npm i appointment-calendar-carousal antd dayjs
```

**Note:** `antd` and `dayjs` are required for this package to work.
It is recommended to use `antd@^5.0.0` and `dayjs@1.11.0`

Then, import the `AppointmentCalenderProvider` and wrap your app with it

```jsx
import { AppointmentCalenderProvider } from 'appointment-calendar-carousal'

function App() {
    return (
        <AppointmentCalenderProvider>
         {...}
        </AppointmentCalenderProvider>
    )
}
```

Lastly, import `CalendarAppointment` and `useAppointmentCalender` hook

```jsx
import CalendarAppointment, { useAppointmentCalender } from 'appointment-calendar-carousal'

function SomeComponent() {
    const { selectedDates } = useAppointment()

    return (
        {...}
         <CalendarAppointment />
        {...}
    )
}
```

## Docs

---

You can use `appointment-calendar-carousal` as is by just wrapping the app with `AppointmentCalenderProvider` and placing the `CalendarAppointment` component where needed. Then You can get values from the provided `useAppointment` hook.

Or you can even use it with your own custom components and even mix some of the provided components like `CalenderCard` as all the components are importable and reuseable for better customization.

### **Components**

---

### `AppointmentCalenderProvider`

This is a Wrapper for the appointment state management and pre-configurations.

| Prop          | Type          | Description                                                                                        | Default |
| ------------- | ------------- | -------------------------------------------------------------------------------------------------- | ------- |
| dates         | IDates[] [^1] | Provide custom dates list _(you can use provided `getDates` helper function to create dates list)_ | -       |
| formats       | Object [^2]   | Provide the custom format for `Date` and `Time`                                                    | -       |
| stylesConfigs | Object [^3]   | Provide some basic configs to the calender carousel                                                | -       |

[^1]: An Array containing a list of dates.

```ts
Array<{
  dates: Dayjs
  isCurrent: boolean /** wether date is today */
}>
```

[^2]: An object with date and time formats.

```ts
{
  date: string /** @default "DD, MMMM YYYY" */
  time: string /** @default "h:mm a" */
}
```

[^3]: An object for providing some basic carousel styles.

```ts
{
  cardWidth?: number; /** @default 170 */
  gap?: number; /** @default 10 */
  cardsPerView?: number; /** @default 3 */
}
```

### `CalendarAppointment`

This is the main component and can be used as is with `useAppointment`, or can be used as a controlled component.

| Prop         | Type     | Description                                     | Default |
| ------------ | -------- | ----------------------------------------------- | ------- |
| data         | IDates[] | Provide custom dates list if not using Provider | -       |
| formats      | Object   | Provide the custom format for `Date` and `Time` | -       |
| cardWidth    | number   | Width of the `CalenderCard`                     | 170     |
| cardsPerView | number   | Number of cards shown per view in carousel      | 3       |
| gap          | number   | Space between each card within carousel         | 10      |

### `AppCollapsible`

A simple Wrapper for `AppPanel`.

### `AppPanel`

A Simple Panel.

| Prop        | Type                | Description                          | Default |
| ----------- | ------------------- | ------------------------------------ | ------- |
| header      | string or ReactNode | Title for the panel                  | -       |
| extra       | string or ReactNode | Element for right side of panel      | -       |
| staticPanel | boolean             | Wether panel has dropdown or not     | false   |
| open        | boolean             | Is panel open by default             | false   |
| onChange    | (): void            | callback when panel is opened/closed | -       |

### Hooks

---

### `useAppointmentCalender()`

This contains all the configs and state of the appointment calender.

| Values           | Type           | Description                                                            |
| ---------------- | -------------- | ---------------------------------------------------------------------- |
| dates            | IDates[]       | List of dates to be shown in carousel                                  |
| formats          | Object         | Provided formats for date and time                                     |
| stylesConfig     | Object         | Provided style configs                                                 |
| selectedDates    | IDates         | Date selected via `CalendarAppointment` component                      |
| setSelectedDates | (IDates): void | used to manually select a date _(useful if creating custom component)_ |

### Helper Functions

---

### `getDates()`

This a helper function that generates a list of dates in the form of `IDates[]`.

| Args   | Type   | Description                                                                                                        |
| ------ | ------ | ------------------------------------------------------------------------------------------------------------------ |
| radius | number | if no `from` and `to` are provided you can provide `radius` to let generate dates list with in the radius of _Now_ |
| from   | Dayjs  | Date from which the date list should start                                                                         |
| to     | Dayjs  | Date at which the date list should end                                                                             |

## License

[MIT Licensed](LICENSE)
Copyright (c) 2023 Muqarrab Hussain
