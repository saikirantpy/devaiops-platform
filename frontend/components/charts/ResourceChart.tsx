"use client";

import {

 BarChart,

 Bar,

 XAxis,

 YAxis,

 Tooltip,

 ResponsiveContainer,

 CartesianGrid

}

from "recharts";

type Props={

 cpu:number;

 memory:number;

};

export default function ResourceChart({

 cpu,

 memory

}:Props){

 const data=[

  {

   metric:"CPU",

   value:cpu

  },

  {

   metric:"Memory",

   value:memory

  }

 ];

 return(

  <div

   className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"

  >

   <h2

    className="text-2xl font-bold mb-4"

   >

    Resource Usage

   </h2>

   <div className="h-80">

    <ResponsiveContainer>

     <BarChart data={data}>

      <CartesianGrid/>

      <XAxis dataKey="metric"/>

      <YAxis/>

      <Tooltip/>

      <Bar dataKey="value"/>

     </BarChart>

    </ResponsiveContainer>

   </div>

  </div>

 );

}
