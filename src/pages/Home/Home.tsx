import MainLayout from "../../layouts/mainLayout/MainLayout";
import HeroScene from "../../scenes/hero/HeroScene"
import CollectionScene from "../../scenes/collection/CollectionScene";
function Home() {
  return <MainLayout>
      <HeroScene/>
      <CollectionScene/>
  </MainLayout>;
}

export default Home;