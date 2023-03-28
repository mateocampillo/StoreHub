import React from 'react';
React.useLayoutEffect = React.useEffect
import HeadComponent from '@/Components/Head';
import Sidebar from '@/Components/Sidebar'
import { ProSidebarProvider } from 'react-pro-sidebar';
import styles from '@/styles/mainIndex.module.css';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import CardComponent from '@/Components/MainCard';

interface apiData{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: object;
}

function Home({data}: {data:Array<apiData>}) {

  return (
    <>
      <HeadComponent title='StoreHub' />
      <ProSidebarProvider>
        <Sidebar />
        <main>
          <section>
            <Card className={styles.card}>
              <CardMedia className={styles.cardMedia} image={data[14].image} title={data[14].title}/>
              <CardContent className={styles.cardContent}>
                <Typography gutterBottom variant="h5" component="div">
                  {data[14].title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data[14].description}
                </Typography>
              </CardContent>
            </Card>
            <div className={styles.infoContainer}>
                <Link href={`/products/${data[14].id}`}>Learn more</Link>
              </div>
          </section>
          <section>
            <h2>Shop Our Top Categories</h2>
            <div><CardComponent title={data[1].title} image={data[1].image}/></div>
            <div><CardComponent title={data[2].title} image={data[2].image}/></div>
            <div><CardComponent title={data[3].title} image={data[3].image}/></div>
            <div><CardComponent title={data[4].title} image={data[4].image}/></div>
          </section>
        </main>
        <footer>
          <h2>Footer</h2>
        </footer>
      </ProSidebarProvider>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://fakestoreapi.com/products')
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}

export default Home