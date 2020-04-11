import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { signInWithGoogle, auth } from "../firebase/Firebase";
import { connect } from "react-redux";
import Welcome from "./Welcome";

makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    error: null,
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error.message);
      this.setState({ error: error.message });
      setTimeout(() => {
        this.setState({ error: "" });
      }, 3000);
    }
  };
  render() {
    if (this.props.currentUser) {
      return <Welcome />;
    }
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={makeStyles.paper}>
          <Avatar className={makeStyles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={makeStyles.form}
            noValidate
            onSubmit={this.handleSubmit}
          >
            <h3 style={{ color: "red" }}>{this.state.error}</h3>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange}
              value={this.state.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={makeStyles.submit}
            >
              Sign In
            </Button>
            <Button
              onClick={() => signInWithGoogle()}
              variant="contained"
              fullWidth
              color="secondary"
            >
              Sign In With Google
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(SignIn);
