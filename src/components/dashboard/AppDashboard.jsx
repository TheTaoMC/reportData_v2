import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import Bar from "./Bar";
import Pie from "./Pie";
import Doughnut from "./Doughnut";
import AppCard from "./Cards/AppCard";

function AppDashboard() {
  const data = [
    {
      SumByProduct: [
        {
          ProductDataID: "A",
          ProductID: "",
          CountTransaction: 100,
          SumWeightNet: 1000,
          SumAmountNet: 5000,
        },
        {
          ProductDataID: "B",
          ProductID: "",
          CountTransaction: 200,
          SumWeightNet: 2000,
          SumAmountNet: 10000,
        },
        {
          ProductDataID: "C",
          ProductID: "",
          CountTransaction: 300,
          SumWeightNet: 3000,
          SumAmountNet: 15000,
        },
        {
          ProductDataID: "D",
          ProductID: "",
          CountTransaction: 400,
          SumWeightNet: 4000,
          SumAmountNet: 20000,
        },
      ],
    },
  ];

  return (
    <>
      <div className="">
        <div className="m-auto w-[90%] flex md:justify-between justify-center flex-wrap gap-2 mt-2">
          {data.map((item, index) =>
            item.SumByProduct.map((product, productIndex) => (
              <AppCard
                key={productIndex}
                title={product.ProductDataID}
                CountTransaction={product.CountTransaction}
                SumWeightNet={product.SumWeightNet}
                SumAmountNet={product.SumAmountNet}
              />
            ))
          )}
        </div>

        {/*    <Bar />
        <Pie /> */}
        {/* <Doughnut /> */}
      </div>
    </>
  );
}

export default AppDashboard;
