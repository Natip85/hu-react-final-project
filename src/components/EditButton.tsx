import React, { useContext } from 'react'
import { CardContext } from '../pages/MyCard';
import { Button } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";

interface Props {
  cardId: string;
}

const EditButton = ({cardId}: Props) => {
  const context = useContext(CardContext);

  function handleClick() {
    if (!context) return;
    context.onEdit(cardId);
  }

  return (
 <Button onClick={handleClick}>
<EditIcon />
 </Button>
  )
}

export default EditButton