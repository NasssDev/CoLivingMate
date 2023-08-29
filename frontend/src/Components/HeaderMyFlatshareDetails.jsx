import {DoorOpen} from "lucide-react";
import React from "react";

export const HeaderMyFlatshareDetails = ({setPopupConfirmLeave}) => {
    return (
        <div className={"relative"}>
            <h1 className="text-3xl text-indigo-500">My Flat Share Details</h1>
            <span onClick={() => setPopupConfirmLeave(true)}
                  className={"py-2 px-1 absolute right-0 top-0 sm:top-1.5 sm:py-0 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:cursor-pointer rounded-lg "}>
                    <span className={"hidden sm:block float-left"}>Leave</span><DoorOpen className={"float-right"}/>
                </span>
        </div>
    )
}