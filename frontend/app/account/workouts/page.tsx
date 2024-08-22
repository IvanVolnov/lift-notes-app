import { getWorkouts } from '../../lib/workoutsActions';
import { Button, Container, Typography } from '@mui/material';
import { cookies } from 'next/headers';
import decodeJwtToken from '@/app/utils/decodeJwtToken';
import NextButton from '@/app/components/UI/NextButton';

export interface Workout {
  workout_id: string;
  workout_name: string;
  workout_description: string;
}

export default async function Workouts() {
  const data: Workout[] = await getWorkouts();
  const cookie = cookies().get('accessToken')?.value || '';
  const session = decodeJwtToken(cookie);
  const email = session?.email as string;

  return (
    <>
      <Typography variant='h2'>Workouts</Typography>
      <NextButton variant='outlined' size='large'>
        Add new workout
      </NextButton>
      <div>
        {data?.map((workout) => (
          <div key={workout.workout_id}>
            <h1>{workout.workout_name}</h1>
            <p>{workout.workout_description}</p>
          </div>
        ))}
      </div>
      <Button size='large'>Manage workouts</Button>
    </>
  );
}
