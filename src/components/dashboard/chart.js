import { Button, Grid, Menu, MenuItem, TextField } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

export default function Chart() {
  useEffect(()=>{
    getData()
  },[])
  const types = [
    { id: 0, name: "BAR CHART" },
    { id: 1, name: "LINE CHART" },
    { id: 2, name: "AREA CHART" },
  ];
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentType, setCurrentType] = useState(0);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (index) => {
    setAnchorEl(null);
    setCurrentType(index);
  };

  const getData = async()=>{
    await fetch('http://localhost:8000/get-data').then(res=>res.json()).then(data=>setData(data))
  }
  return (
    <>
      <Grid container>
        <Grid item xs={9}>
          <div>
            {currentType === 0 && (
              <BarChart
                width={1000}
                height={500}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            )}
            {currentType === 2 && (
              <AreaChart
                width={1000}
                height={500}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            )}

            {currentType === 1 && (
              <LineChart
                width={1000}
                height={500}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            )}
          </div>
        </Grid>
        <Grid item xs={3} style={{ marginTop: "1rem" }}>
          <Button
            variant="contained"
            color="primary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            {types[currentType].name}
            <KeyboardArrowDown />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => {
              handleClose(currentType);
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose(0);
              }}
            >
              {types[0].name}
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose(1);
              }}
            >
              {types[1].name}
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose(2);
              }}
            >
              {types[2].name}
            </MenuItem>
          </Menu>
          <Grid
            container
            direction="column"
            spacing={3}
            style={{ marginTop: "1rem" }}
          >
            <Grid item>
              <TextField
                id="date"
                label="From"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="date"
                label="To"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}