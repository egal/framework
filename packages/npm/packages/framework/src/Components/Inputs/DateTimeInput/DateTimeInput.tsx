import * as React from 'react';
import { useEffect, useState } from 'react';
import dateFormat from 'dateformat';
import { Box, Button } from 'grommet';
import { MaskedInput } from 'grommet/components/MaskedInput';
import { Calendar, Clock } from 'grommet-icons';

export function DateTimeInput(event: any) {
  // TODO: Hours, minutes, seconds steps props.
  // TODO: Not disabling.

  const { value, onChange } = event;

  const dateMask = 'yyyy-mm-dd';
  const timeMask = 'hh:MM:ss';
  const dateTimeMask = `${dateMask} ${timeMask}`;

  const currentYear = parseInt(dateFormat(Date.now(), 'yyyy'));

  // console.log(value);
  // console.log(Date.parse(value));
  // console.log(dateFormat(Date.parse(value), dateTimeMask));

  const dateFromValue = () => value ?? dateFormat(Date.parse(value), dateMask);
  const [date, setDate] = useState(dateFromValue());

  const timeFromValue = () => value ?? dateFormat(Date.parse(value), timeMask);
  const [time, setTime] = useState(timeFromValue());

  // console.log(dateFromValue(), timeFromValue());

  useEffect(() => {
    setDate(dateFromValue());
    setTime(timeFromValue());
  }, [value]);

  useEffect(() => {
    // console.log(date, time);

    if (date === undefined || time === undefined) {
      onChange({ ...event, value });
      return;
    }

    const dateSplit = date.split('.');
    if (dateSplit.length !== 3 || time.split(':').length !== 3) return;
    const dateTime = Date.parse(
      `${dateSplit[2]}-0${dateSplit[1]}-0${dateSplit[0]} ${time}`
    );
    const newValue = dateFormat(dateTime, dateTimeMask);
    onChange({ ...event, value: newValue });
  }, [date, time]);

  const daysInMonth = (month: number) => new Date(2019, month, 0).getDate();

  return (
    <Box direction={'row'} gap={'xsmall'}>
      <MaskedInput
        mask={[
          {
            length: [1, 2],
            options: Array.from(
              {
                length: daysInMonth(parseInt(dateFormat(value, 'mm'), 10)),
              },
              (v, k) => k + 1
            ),
            regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
            placeholder: 'dd',
          },
          { fixed: '.' },
          {
            length: [1, 2],
            options: Array.from({ length: 12 }, (v, k) => k + 1),
            regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
            placeholder: 'mm',
          },
          { fixed: '.' },
          {
            length: 4,
            options: Array.from({ length: 100 }, (v, k) => currentYear - k),
            regexp:
              /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
            placeholder: 'yyyy',
          },
        ]}
        value={date}
        onChange={({ target: { value: newDate } }) => setDate(newDate)}
      />
      <Button icon={<Calendar />} />
      <MaskedInput
        mask={[
          {
            length: [1, 2],
            options: Array.from({ length: 25 }, (_, i) => i),
            regexp: /^1[1-2]$|^[0-9]$/,
            placeholder: 'hh',
          },
          { fixed: ':' },
          {
            length: 2,
            options: Array.from({ length: 7 }, (_, i) => i * 10),
            regexp: /^[0-5][0-9]$|^[0-9]$/,
            placeholder: 'mm',
          },
          { fixed: ':' },
          {
            length: 2,
            options: Array.from({ length: 7 }, (_, i) => i * 10),
            regexp: /^[0-5][0-9]$|^[0-9]$/,
            placeholder: 'ss',
          },
        ]}
        value={time}
        onChange={({ target: { value: newTime } }: any) => setTime(newTime)}
      />
      <Button icon={<Clock />} />
    </Box>
  );
}
