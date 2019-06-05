import React from "react";
import ChatListComponent from "../chatlist/ChatList";
import { Button, withStyles } from "@material-ui/core";
import styles from "./styles";

const firebase = require("firebase");

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      email: null,
      chats: []
    };
  }

  selectChat = chatIndex => {
    console.log("seleced a chat", chatIndex);
  };

  newChatBtnClicked = () => {
    this.setState({ newChatFormVisible: true, selectedChat: null });
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async _usr => {
      if (!_usr) this.props.history.push("/login");
      else {
        await firebase
          .firestore()
          .collection("chats")
          .where("users", "array-contains", _usr.email)
          .onSnapshot(async res => {
            const chats = res.docs.map(_doc => _doc.data());
            await this.setState({
              email: _usr.email,
              chats: chats
            });
            console.log(this.state);
          });
      }
    });
  };

  signOut = () => firebase.auth().signOut();

  render() {
    const { classes } = this.props;

    return (
      <div>
        <ChatListComponent
          history={this.props.history}
          newChatBtnFn={this.newChatBtnClicked}
          selectChatFn={this.selectChat}
          chats={this.state.chats}
          userEmail={this.state.email}
          selectedChatIndex={this.state.selectedChat}
        />
        <Button className={classes.signOutBtn} onClick={this.signOut}>
          Sign Out
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(DashboardComponent);
