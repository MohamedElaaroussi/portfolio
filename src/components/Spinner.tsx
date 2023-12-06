import React from "react";


export const Spinner = ({color}:{color?:string | null}) => (

<div className={`border-8 border-dashed rounded-full animate-spin ${color ?`border-WT w-[7.5vw] h-[7.5vw] lg:w-[1.5vw] lg:h-[1.5vw]`: "border-termine w-[10vw] h-[10vw] lg:w-[2vw] lg:h-[2vw]"}`}></div>
)