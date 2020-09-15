import React from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grow,
} from "@material-ui/core";

import styles from "./App.module.css";

class App extends React.Component {
  state = { advice: "" };

  fetchApi = async () => {
    const id = Math.floor(Math.random() * 100) - 1;
    try {
      const response = await axios.get(
        `https://api.adviceslip.com/advice/${id}`
      );
      const data = JSON.parse(response.data + "}");
      const { advice } = data.slip;
      this.setState({ advice });
    } catch (error) {
      console.log("id", id);
      console.log(error);
    }
  };

  componentDidMount = () => {
    this.fetchApi();
  };

  render() {
    const { advice } = this.state;

    if (!advice) {
      return null;
    }

    return (
      <div className={styles.container}>
        <Grow in={true}>
          <Card>
            <CardContent>
              <Typography style={{fontFamily: "Quicksand"}} variant="h5" component="h5">
                {advice}
              </Typography>
            </CardContent>
            <CardActions className={styles.cardAction}>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.fetchApi}
              >
              Next
              </Button>
            </CardActions>
          </Card>
        </Grow>
      </div>
    );
  }
}

export default App;