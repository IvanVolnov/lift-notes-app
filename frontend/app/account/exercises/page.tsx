import ContentList from '@/app/components/sortableList/ContentList';
import ContentFooterBtn from '@/app/components/UI/ContentFooterBtn';
import ContentHeaderBtn from '@/app/components/UI/ContentHeaderBtn';
import ContentHeaderMenu from '@/app/components/UI/ContentHeaderMenu';
import extractUserId from '@/app/utils/extractUserId';
import { Typography } from '@mui/material';

export default function Exercises() {
  const data: Exercise[] = [];

  const { cookie, userId } = extractUserId();

  return (
    <>
      <ContentHeaderMenu>
        <Typography variant='h2'>All Exercises</Typography>
        {/* <ContentHeaderBtn>Add new exercise</ContentHeaderBtn> */}
      </ContentHeaderMenu>
      {data.length === 0 ? (
        <Typography mt={4} variant='subtitle1'>
          There are no exercises yet
        </Typography>
      ) : (
        <>
          <ContentList
            data={data}
            cookie={cookie}
            userId={userId}
            mode='exercise'
          />
          <ContentFooterBtn>Manage exercises</ContentFooterBtn>
        </>
      )}
    </>
  );
}
