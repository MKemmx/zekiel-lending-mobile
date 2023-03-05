import { ScrollView, Skeleton } from "native-base";

interface Props {
  loadingLength: number;
}

const ListLoader: React.FC<Props> = ({ loadingLength }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {[...Array(loadingLength)].map((_, index) => (
        <Skeleton mb={3} key={index} h="20" />
      ))}
    </ScrollView>
  );
};

export default ListLoader;
