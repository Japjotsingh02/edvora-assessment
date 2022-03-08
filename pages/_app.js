import '../styles/globals.css';
import { StateProvider } from '../components/StateProvider';
import reducer, { initialState } from '../components/reducer';

export default function MyApp({ user,Component, pageProps }) {
  return (
    <>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>
    </>
  )
}

