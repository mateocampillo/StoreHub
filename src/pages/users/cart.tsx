'use client';
import React from 'react';
import HeadComponent from '@/Components/Head';
import Sidebar from '@/Components/Sidebar';
import Footer from '@/Components/Footer';
import { ProSidebarProvider } from 'react-pro-sidebar';
import styles from '@/styles/cart.module.css';
import Banner from '@/Components/Banner';
import {Mulish, Roboto_Condensed} from 'next/font/google';
const mulish = Mulish({weight: ['300'], style: ['normal'], subsets: ['latin']})
const roboto_c = Roboto_Condensed({weight: ['400'], style: ['normal'], subsets: ['latin']})
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '@/Components/Loading';
import { useAppSelector } from '../../../store/store';
import CartItemComponent from '@/Components/CartItemComponent'

const Cart: NextPage = (): JSX.Element => {

    const { status, data } = useSession() as any;

    const cartItems = useAppSelector((state) => state.cart.cartItems)

    useEffect(() => {
        if (status === 'unauthenticated'){
            Router.replace('/users/login');
        }
    }, [status]);

    if (status === 'authenticated'){
        return (
            <>
                <HeadComponent title='User Cart' />
                <ProSidebarProvider>
                    <Sidebar />
                    <Banner />
                    <main className={mulish.className}>
                    <h1>Review Items and Shipping</h1>
                        <section>
                            <h2>Cart Product List</h2>
                            {cartItems.map((item) => (
                                <CartItemComponent cartItem={item} key={item.product.id}/>
                            ))}
                        </section>
                        <section>
                            <h2>Delivery Information</h2>
                            <p>user logged: {data.user?.name}</p>
                        </section>
                        <section>
                            <h2>Order summary</h2>
                        </section>
                    </main>
                    <Footer />
                </ProSidebarProvider>
            </>
        )
    }

    return (
        <Loading />
    )
}

export default Cart