import React, { useEffect } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";

const ChatViewComponent = ({ classes, chat, user }) => {
  useEffect(() => {
    const container = document.getElementById("chatview-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  });

  if (chat === undefined) {
    return <main id="chatview-container" className={classes.content} />;
  } else {
    return (
      <div>
        <div className={classes.chatHeader}>
          Your conversation with {chat.users.filter(_usr => _usr !== user)}
        </div>
        <main id="chatview-container" className={classes.content}>
          {chat.messages.map((_msg, _index) => {
            return (
              <div
                key={_index}
                className={
                  _msg.sender === user ? classes.userSent : classes.friendSent
                }
              >
                {_msg.message}
              </div>
            );
          })}
        </main>
      </div>
    );
  }
};

export default withStyles(styles)(ChatViewComponent);
