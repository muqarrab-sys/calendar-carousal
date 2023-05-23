# master

# 1.2.1

1. Added new `minDuration` and `maxDuration` props for restricting to a min/max duration time in the `CalendarAppointment` component and `useAppointmentCalender` hook.
   | Prop | Type | Description | Default |
   | --- | --- | --- | --- |
   | minDuration | number | Minimum time the duration can be | 30 |
   | maxDuration | number | Maximum time the duration can be | 120 |
2. Added capability to add custom components for `CalendarAppointment` panels.


# 1.2.0

1. Added styles props for following components:

   1. CalendarAppointment
      | Prop | Type | Description | Default |
      | --- | --- | --- | --- |
      | containerStyle | CSSProperties | Component container styles object | - |
      | collapseContainerStyle | CSSProperties | Collapse container styles object | - |
      | durationContainerStyles | CSSProperties | Duration panel container styles object | - |
      | durationContainerStyles | CSSProperties | Duration panel container styles object | - |
      | cardStyles | {head?: CSSProperties, body: CSSProperties} | `CalenderCard` component styles object | - |
   2. CalendarCarousel
      | Prop | Type | Description | Default |
      | --- | --- | --- | --- |
      | cardStyles | {head?: CSSProperties, body: CSSProperties} | `CalenderCard` component styles object | - |
   3. CalenderCard
      | Prop | Type | Description | Default |
      | --- | --- | --- | --- |
      | headStyle | CSSProperties | Styles object for head part of the card | - |
      | bodyStyle | CSSProperties | Styles object for body part of the card | - |

2. After selecting date in date panel, date panel will close and time panel will open.
3. If currently selected date is "Today", header will show text "Today" rather then the date.
4. Removed `isCurrent` from `IDate` interface as Dayjs itself provides `isToday` on its date object.
5. Added methods for checking if time can be added/subtracted from selected datetime object without changing day
   | Values | Type | Description |
   | --- | --- | --- |
   | canAddTime | (by: 'hours' or 'minutes'): boolean | returns true if time can be added without changing day |
   | canSubtractTime | (by: 'hours' or 'minutes'): boolean | returns true if time can be subtracted without changing day |
