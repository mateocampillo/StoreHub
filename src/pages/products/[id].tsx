import React from 'react';
import HeadComponent from '@/Components/Head';
import Sidebar from '@/Components/Sidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Footer from '@/Components/Footer';

interface ratingObject{
  rate: number;
  count: number;
}
interface apiData{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ratingObject;
}

function ProductDetail({data}: {data:apiData}) {

  return (
    <>
      <HeadComponent title='Product Id' />
      <ProSidebarProvider>
        <Sidebar />
        <main>
          <h1>producto {data.title}</h1>
        </main>
        <Footer />
      </ProSidebarProvider>
    </>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`https://fakestoreapi.com/products`)
  const data = await res.json()
  const paths = data.map((product: apiData) => {
    return {
      params: {
        id: `${product.id}`
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(context: { params: apiData; }) {
  const {params} = context
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`)
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}

export default ProductDetail