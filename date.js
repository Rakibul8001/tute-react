import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function ViewsDatePicker() {
  const [value, setValue] = React.useState(dayjs('2022-04-07'));

  const person={
    fullName: function(){
      return this.firstName+ " "+this.lastName;
    }
  };

  const person1={
    firstName:"Mominul",
    lastName:"Islam"
  }

  // console.log(person.fullName.call(person1))

  


  // console.log(person.fullName());


  // const [person,setPerson]=React.useState({
  //   fullName: function(){
  //     return this.firstName+" "+this.lastName;
  //   }
  // });

  // const person1={
  //   firstName:"Mominul",
  //   lastName:"Islam"
  // }

  // console.log(person.fullName.call(person1))


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    

        <DatePicker
          views={['year', 'month']}
          label="Year and Month"
          minDate={dayjs('2012-03-01')}
          maxDate={dayjs('2023-06-01')}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />


    
    </LocalizationProvider>
  );
}
