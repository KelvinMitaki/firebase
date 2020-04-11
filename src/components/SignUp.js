import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { auth, createUserProfileDocument } from "../firebase/Firebase";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class SignUp extends React.Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({ error: "Passwords do not match" });

      return setTimeout(() => {
        this.setState({ error: "" });
      }, 3000);
    }
    if (!displayName) {
      this.setState({ error: "Please enter a display name" });

      return setTimeout(() => {
        this.setState({ error: "" });
      }, 3000);
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error.message);
      this.setState({ error: error.message });
      setTimeout(() => {
        this.setState({ error: "" });
      }, 3000);
    }
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    if (this.props.currentUser) {
      return <Redirect to="/welcome" />;
    }
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={makeStyles.paper}>
          <Avatar className={makeStyles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={makeStyles.form}
            onSubmit={this.handleSubmit}
            noValidate
          >
            <h3 style={{ color: "red" }}>{this.state.error}</h3>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="displayName"
                  variant="outlined"
                  required
                  onChange={this.handleChange}
                  value={this.state.displayName}
                  fullWidth
                  id="displayName"
                  label="Display Name"
                  autoFocus
                  type="text"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  onChange={this.handleChange}
                  value={this.state.email}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  onChange={this.handleChange}
                  value={this.state.password}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  onChange={this.handleChange}
                  value={this.state.confirmPassword}
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={makeStyles.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
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
  return { currentUser: state.user.currentUser };
};
export default connect(mapStateToProps)(SignUp);
