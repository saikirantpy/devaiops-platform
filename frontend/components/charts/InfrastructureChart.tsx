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

 nodes:number;

 pods:number;

 deployments:number;

};

export default function InfrastructureChart({

 nodes,

 pods,

 deployments

}:Props){

 const data=[

  {

   metric:"Nodes",

   value:nodes

  },

  {

   metric:"Pods",

   value:pods

  },

  {

   metric:"Deployments",

   value:deployments

  }

 ];

 return(

  <div

   className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"

  >

   <h2

    className="text-2xl font-bold mb-4"

   >

    Infrastructure

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
