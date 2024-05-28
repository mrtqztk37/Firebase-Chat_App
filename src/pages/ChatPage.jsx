import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useEffect, useState } from "react";
import Message from "../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);

  const sendeMessage = async (e) => {
    e.preventDefault();

    const messageCol = collection(db, "messages");

    await addDoc(messageCol, {
      text: e.target[0].value.trim(),
      room,
      author: {
        id: auth.currentUser?.uid,
        name: auth.currentUser?.displayName,
        photo: auth.currentUser?.photoURL,
      },
      createdAt: serverTimestamp(),
    });
    e.target.reset();
  };

  useEffect(() => {
    const messagesCol = collection(db, "messages");

    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const tempMsg = [];

      snapshot.docs.forEach((doc) => tempMsg.push(doc.data()));

      setMessages(tempMsg);
    });

    return () => unsub();
  }, []);

  return (
    <div className="chat-page">
      <header>
        <p> {auth.currentUser?.displayName} </p>
        <p>{room} </p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>
      <main>
        {messages.length > 0 ? (
          messages.map((data, i) => <Message data={data} key={i} />)
        ) : (
          <p className="warn">
            <span>
              Henüz hiç mesaj gönderilmedi. İlk mesajı siz gönderebilirsiniz...
            </span>
          </p>
        )}
      </main>
      <form onSubmit={sendeMessage}>
        <input required placeholder="Mesajınızı Yazınız..." type="text" />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
