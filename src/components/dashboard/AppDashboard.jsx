import React, { useState, useEffect } from "react"
import { Chart } from "primereact/chart"
import Bar from "./Bar"
import Pie from "./Pie"
import Doughnut from "./Doughnut"

function AppDashboard() {
  return (
    <>
      <div className="card">
        {/*    <Bar />
        <Pie /> */}
        <Doughnut />
      </div>
    </>
  )
}

export default AppDashboard
