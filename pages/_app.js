import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <main className="main-wrapper">
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
