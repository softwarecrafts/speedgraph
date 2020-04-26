import React, { useState } from "react"
import { graphql } from "gatsby"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import moment from "moment"
import { isEmpty } from 'lodash'
import {
  ma
} from 'moving-averages'

import Layout from "../components/layout"
import SEO from "../components/seo"

const StatBox = ({text, children}) => (
    <div className="border-2 border-gray-500 m-8 px-4 py-4 text-center row-span-1">
        <h2 className="text-5xl text-indigo-900">{children}</h2>
        <h2 className="text-3xl text-indigo-600">{text}</h2>
    </div>
)

const IndexPage = ({ data }) => {
  var storedThreshold = typeof window !== undefined && window.localStorage.getItem("threshold")
  const [threshold, setThreshold] = useState(storedThreshold || 40)
  const today = moment();
  const lastHour = moment({...today.toObject(), hour: today.hour() - 1})
  const yesterday = moment({...today.toObject(), date: today.date() - 1})
  const lastWeek = moment({...today.toObject(), date: today.date() - 7})
  const [minDate, setMinDate] = useState(yesterday)
  const updateThreshold = (value) => {
    typeof window !== undefined && window.localStorage.setItem("threshold", value)
    setThreshold(value)
  }
  const graphData = data.allJson.edges.map(({node}) => ({speed: node.speed, datetime: moment(node.datetime)}))
  const dayData = graphData.filter(point => point.datetime >= yesterday)
  const weekData = graphData.filter(point => point.datetime >= lastWeek)

  const visibleGraphData = graphData.filter(point => point.datetime >= minDate)


  const reducer = (accumulator, currentValue) => accumulator + Number(currentValue.speed);
  const avg = arr => !isEmpty(arr) ? Math.round((arr.reduce(reducer, 0) / arr.length + Number.EPSILON) * 100) / 100 : '-'



  const dailyMAvg = visibleGraphData.map((point, idx) => ({...point, avg:ma(visibleGraphData.map(n => n.speed), 3)[idx]}))


  const dailyAvg = avg(dayData)
  const weeklyAvg = avg(weekData)
  const thresholdStatus = dailyAvg >= threshold ? '😊' : '😡'

  return (
  <Layout>
    <SEO title="Home" />
    <div className="grid gap-4 grid-cols-4 grid-rows-3 max-h-full">
      <StatBox text={"Daily Average (Mb/s)"} >{dailyAvg}</StatBox>
      <StatBox text={"Weekly Average (Mb/s)"} >{weeklyAvg}</StatBox>
      <StatBox text={"Threshold Status"} >{thresholdStatus}</StatBox>
      <div className="border-2 border-gray-500 m-8 px-6 py-4 text-left">
          <h2 className="text-lg text-indigo-600">Set Threshold</h2>
          <input className="my-2 bg-white focus:outline-none focus:shadow-outline border border-gray-300 py-1 px-2 block w-full appearance-none leading-normal text-indigo-600" type="text" placeholder="50" onChange={e => updateThreshold(e.target.value)} value={threshold}/>
          <hr/>
          <h2 className="text-lg text-indigo-600 my-2">Set Date Range</h2>
          <span className="relative z-0 inline-flex shadow-sm mb-2">
            <button type="button" className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" onClick={() => setMinDate(lastWeek)}>
              Week
            </button>
            <button type="button" className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" onClick={() => setMinDate(yesterday)}>
              Day
            </button>
            <button type="button" className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" onClick={() => setMinDate(lastHour)}>
              Hour
            </button>
          </span>
      </div>
      <div className="col-start-1 col-end-5 row-start-2 row-end-4">
        <ResponsiveContainer height={465} >
          <LineChart data={dailyMAvg} className="-ml-4">
            <ReferenceLine
              y={threshold}
              label="min speed"
              stroke="red"
              strokeDasharray="3 3"
            />
            <Line type="monotone" dataKey="speed" stroke="#8884d8" />
            <Line type="monotone" dataKey="avg" stroke="#333" strokeDasharray="3 1 3" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis
              dataKey="datetime"
              type="number"
              domain={[
                dataMin => minDate.valueOf(),
                dataMax => today.valueOf(),
              ]}
              tickFormatter={unixTime =>
                moment(new Date(unixTime).getTime()).format("HH:mm")
              }
              tickCount={12}
              tick={{ fontSize: '12px', width: 50, wordWrap: 'break-word' }}
            />
            <YAxis label={{ value: 'Speed (Mb/s)', angle: -90, position: 'center', fontSize: '14px'  }} tick={{ fontSize: '12px', width: 50, wordWrap: 'break-word' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </Layout>
)}

export default IndexPage

export const query = graphql`
  query SpeedQuery {
    allJson(sort: { fields: datetime, order: DESC }) {
      edges {
        node {
          reldatetime: datetime(fromNow: true)
          speed
          datetime
        }
      }
    }
  }
`
