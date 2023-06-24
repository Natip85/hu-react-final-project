import React, { useContext } from 'react'
import { CardContext } from '../pages/MyCard';
import { Button } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  cardId: string;
}

const DeleteButton = ({cardId}: Props) => {
  const context = useContext(CardContext);

  function handleClick() {
    if (!context) return;
    context.onDelete(cardId);
  }

  return (
 <Button onClick={handleClick}>
  <DeleteIcon />
 </Button>
  )
}

export default DeleteButton