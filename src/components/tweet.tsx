import { styled } from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div`
  &:last-child {
    place-self: end;
  }
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 10px;
`;

const Button = styled.button`
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteButton = styled(Button)`
  background-color: tomato;
`;

const EditButton = styled(Button)`
  background-color: #3498db;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedTweet, setEditedTweet] = useState(tweet);

  const activateEditMode = () => {
    setIsEditing(true);
  };

  const saveEditedTweet = async () => {
    try {
      await updateDoc(doc(db, "tweets", id), {
        tweet: editedTweet,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating tweet:", error);
    }
  };

  const cancelEdit = () => {
    setEditedTweet(tweet);
    setIsEditing(false);
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {isEditing ? (
          <textarea
            value={editedTweet}
            onChange={(e) => setEditedTweet(e.target.value)}
          />
        ) : (
          <Payload>{tweet}</Payload>
        )}
        {user?.uid === userId ? (
          <>
            {isEditing ? (
              <ButtonWrapper>
                <EditButton onClick={saveEditedTweet}>Save</EditButton>
                <DeleteButton onClick={cancelEdit}>Cancel</DeleteButton>
              </ButtonWrapper>
            ) : (
              <ButtonWrapper>
                <EditButton onClick={activateEditMode}>Edit</EditButton>
                <DeleteButton onClick={onDelete}>Delete</DeleteButton>
              </ButtonWrapper>
            )}
          </>
        ) : null}
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
