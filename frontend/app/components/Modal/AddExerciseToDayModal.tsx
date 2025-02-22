import { useModalContext } from '@/app/context/ModalContext';
import {
  Alert,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import { fromatResultDate } from '@/app/utils/formatExerciseResults';
import Checkbox from '@mui/material/Checkbox';
import { useParams, useRouter } from 'next/navigation';

import { useState } from 'react';
import DynamicColorBtn from '../UI/Buttons/DynamicColorBtn';
import SubmitButton from '../UI/Buttons/SubmitButton';
import { addExerciseToDay } from '@/app/lib/workoutsDaysActions';

interface CustomProps {}

export default function AddExerciseToDayModal({}: CustomProps) {
  const { mode, toggleModal } = useModalContext();
  const exerciseResults = mode.exerciseList;
  const { daySlug } = useParams();

  const router = useRouter();

  const [checked, setChecked] = useState<ExerciseNormalised[]>([]);

  const handleToggle = (el: ExerciseNormalised) => () => {
    const currentIndex = checked.findIndex((x) => x.id === el.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(el);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleClose = () => {
    toggleModal();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const exercises = checked.map((el) => el.id);
    addExerciseToDay(exercises, daySlug as string);
    router.refresh();
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>add exercises to day</DialogTitle>
      <DialogContent>
        <Typography variant='body1' mt={3} mb={2}>
          Exercises:
        </Typography>
        <List>
          {exerciseResults?.length ? (
            exerciseResults?.map((el) => {
              return (
                <ListItem key={el.id} onClick={handleToggle(el)} dense={true}>
                  <ListItemIcon>
                    <Checkbox
                      edge='start'
                      checked={checked.some((x) => x.id === el.id)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': el.id }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={`id${el.id}`}
                    primary={el.name}
                    secondary={
                      el.exerciseResults[0]
                        ? `last result updated: ${fromatResultDate(
                            el.exerciseResults[0].resultDate
                          )}`
                        : `exercise created at: ${fromatResultDate(
                            el.created_at.toString()
                          )}`
                    }
                  />
                </ListItem>
              );
            })
          ) : (
            <Alert variant='outlined' severity='info'>
              There are no exercises to add for this day.
            </Alert>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <DynamicColorBtn onClick={handleClose}>Cancel</DynamicColorBtn>
        <SubmitButton>Submit</SubmitButton>
      </DialogActions>
    </form>
  );
}
