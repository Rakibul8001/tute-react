import MyToast from "@mdrakibul8001/toastify";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState,Fragment } from "react";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { ScrollContainer } from "react-indiana-drag-scroll";
import Axios from '../../utils/axios';

function price() {
    const { http } = Axios();
    const [dateOpen, setDateOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(dayjs());

    // console.log(currentDate);

const [parentRoomTypes,setParentRoomTypes] = useState([]);

// console.log(`${parentRoomTypes[0]?.hourly_slots[0]?.id}`);
// console.log(parentRoomTypes);

const ParentRoomTypes = useCallback(async () => {
  let isSubscribed = true;
  await http
    .post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/roomPrice/hourly`, {
      action: "roomTypeSlotsInfo"
    })
    .then((res) => {
      if (isSubscribed) {
        console.log(res.data.data)
        setParentRoomTypes(res.data?.data);
      }
    })
    .catch((err) => {
      console.log("Something went wrong !");
    });

  return () => (isSubscribed = false);
}, []);

useEffect(() => {
  ParentRoomTypes();
}, [ParentRoomTypes]);


const [hourlyPrices,setHourlyPrices] = useState({});

// console.log(hourlyPrices);

const fetchHourlyPriceList = useCallback(async () => {
  let isSubscribed = true;
  await http
    .post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/roomPrice/hourly`, {
      action: "hourlyRoomPricesUnderSlot",
      currentDate: currentDate
    })
    .then((res) => {
      if (isSubscribed) {
        console.log(res.data?.data)
        setHourlyPrices(res.data?.data);
      }
    })
    .catch((err) => {
      console.log("Something went wrong !");
    });

  return () => (isSubscribed = false);
}, [currentDate]);

useEffect(() => {
  fetchHourlyPriceList();
}, [fetchHourlyPriceList]);



  return (
    <Fragment>
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                views={["year", "month"]}
                label="Year and Month"
                open={dateOpen}
                onClose={() => setDateOpen(false)}
                value={currentDate}
                onChange={(e) => {
                setCurrentDate(e);
                }}
                renderInput={(params) => (
                <TextField
                    onClick={() => setDateOpen(true)}
                    {...params}
                    size="small"
                    helperText={null}
                />
                )}
            />
            </LocalizationProvider>
        </div>


        <div>
            {parentRoomTypes && parentRoomTypes.map((roomType,index)=>(
                <Fragment>
                    <h1> -- {roomType.id}</h1>
                    <div>
                        {roomType && roomType?.hourly_slots.map((slot,index1)=>(
                            <Fragment>
                                <h1>{slot.id}</h1>
                                <p> ------------ </p>
                                {hourlyPrices && hourlyPrices[`${roomType?.id}`]?.[`${slot?.id}`].map((price,index2)=>(
                                    <p>{price?.date}</p>
                                ))}
                            </Fragment>

                        ))}
                    </div>
                </Fragment>
            ))}
        </div>
    </Fragment>
  )
}

export default price