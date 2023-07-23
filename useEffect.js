import React, { useEffect } from 'react'
import { useCallback } from 'react';

function useEffectFun() {
//First Way
    useEffect(()=>{
        let isSubscribed = true;
        const myFunction = async()=>{
            await http
            .post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/room_type`, {
              action: "allRoomTypes",
            })
            .then((res) => {
              if (isSubscribed) {
                setRoomTypes(res.data.data);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }

        myFunction();

        return ()=>isSubscribed = false;
    },[])

    //2nd Way
    const demoFunction = useCallback(async()=>{
        let isSubscribed = true;
        await http
        .post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/room_type`, {
          action: "allRoomTypes",
        })
        .then((res) => {
          if (isSubscribed) {
            setRoomTypes(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });

        return ()=>isSubscribed = false;
    },[]);

    useEffect(()=>{
        demoFunction();
    },[demoFunction])




  return (
    <div>useEffect</div>
  )
}

export default useEffectFun