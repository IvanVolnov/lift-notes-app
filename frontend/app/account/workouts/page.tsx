import { Typography } from '@mui/material';
import ContentHeaderBtn from '@/app/components/UI/ContentHeaderBtn';
import ContentFooterBtn from '@/app/components/UI/ContentFooterBtn';
import ContentList from '@/app/components/sortableList/ContentList';
import extractUserId from '@/app/utils/extractUserId';
import ContentHeaderMenu from '@/app/components/UI/ContentHeaderMenu';
import { getData } from '@/app/lib/getData';

export default async function Workouts() {
  const data: Workout[] = await getData('workout');

  const { cookie, userId } = extractUserId();

  return (
    <>
      <ContentHeaderMenu>
        <Typography variant='h2'>Workouts</Typography>
        <ContentHeaderBtn entity='workout'>Add new workout</ContentHeaderBtn>
      </ContentHeaderMenu>
      {data.length === 0 ? (
        <Typography mt={4} variant='subtitle1'>
          There are no workouts yet
        </Typography>
      ) : (
        <>
          <ContentList data={data} cookie={cookie} mode='workout' />
          <ContentFooterBtn>Manage workouts</ContentFooterBtn>
        </>
      )}
    </>
  );
}
