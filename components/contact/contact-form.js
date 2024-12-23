import { useEffect, useRef, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

async function sendContactData(contactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

export default function ContactForm() {
  const emailRef = useRef("");
  const nameRef = useRef("");
  const messageRef = useRef("");
  const [requestStstus, setRequestStatus] = useState(); // to show a message to the user
  const [requestError, setRequestError] = useState(); // to show a message to the user

    useEffect(() => {
        if (requestStstus === "success" || requestStstus === "error") {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [requestError, requestStstus, setRequestStatus]);

  async function sendMessageHandler(event) {
    event.preventDefault();
    setRequestStatus("pending");
    try {
        await sendContactData({
            email: emailRef.current.value,
            name: nameRef.current.value,
            message: messageRef.current.value,
        });
        setRequestStatus("success");
        emailRef.current.value = '';
        nameRef.current.value = '';
        messageRef.current.value = '';
    } catch (error) {
        setRequestStatus("error");
        setRequestError(error.message);
    }
  }

  let notification;

  if (requestStstus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  } else if (requestStstus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully!",
    };
  } else if (requestStstus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input ref={emailRef} type="email" id="email" required />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input ref={nameRef} type="text" id="name" required />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea ref={messageRef} id="message" rows="5" required></textarea>
        </div>
        <div className={classes.Actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}
