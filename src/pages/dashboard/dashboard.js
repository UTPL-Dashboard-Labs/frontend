import React, { useEffect, useState } from "react";
import {
  AppBar,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  Bookmark,
  BookOutlined,
  LibraryAdd,
  MenuOutlined,
  Poll,
} from "@material-ui/icons";
import Chart from "../../components/dashboard/chart";

export default function Dashboard() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  useEffect(() => {
    getSubjects();
  });
  const getSubjects = () => {
    fetch("http://localhost:8000/get-subjects")
      .then((res) => res.json())
      .then((res) => setSubjects(res.data.subjects));
  };
  return (
    <Grid container spacing={3}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuOutlined />
          </IconButton>
          <Typography variant="h6">UTPL DASHBOARD LABS</Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={showDrawer} onClose={toggleDrawer}>
        <h3 style={{ marginLeft: "1em" }}>Laboratorios</h3>
        <Divider />
        <List>
          {subjects.map((subject) => (
            <ListItem button key={subject.id}>
              <ListItemIcon>
                <Poll />
              </ListItemIcon>
              <ListItemText primary={subject.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Grid item xs={12}>
        <Chart />
      </Grid>
    </Grid>
  );
}
