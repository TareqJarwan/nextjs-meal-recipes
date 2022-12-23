// Packages
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

// Components
import Layout from '../components/layout/Layout';

// API
import { getSingleMeal } from '../api';

// Styles
import '../styles/globals.scss';

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1/';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1 * 60 * 60 * 1000,
      staleTime: 1 * 60 * 60 * 1000,
    },
  },
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.getItem('savedMeals')) {
      const savedMeals = JSON.parse(localStorage.getItem('savedMeals'));
      savedMeals.forEach((mealId) => {
        queryClient.prefetchQuery(['singleMeal', mealId], getSingleMeal);
      });
    } else {
      localStorage.setItem('savedMeals', JSON.stringify([]));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Meal-khuj</title>
        <meta name="description" content="Meal-khuj is a listing website of meal recipe" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="bottom-right"
          toastOptions={{
				  style: {
				    fontSize: '1.4rem',
				  },
          }}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
