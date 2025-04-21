import { ThemeProvider } from "@material-ui/core";
import { motion } from "framer-motion";
import { Provider } from "react-redux";
import { useEffect } from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import ProgressBar from "@badrap/bar-of-progress";
import relativeTime from "dayjs/plugin/relativeTime";
import Router, { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketProvider } from "../context/socketContext";
import store from "../redux/store";
import Wrapper from "../components/Wrapper";
import locale from "dayjs/locale/es-mx";
import "../styles/globals.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { CommonFiltersProvider } from "../context/commonFiltersContext";
import "regenerator-runtime/runtime";
import { PendingsProvider } from "../features/CalendarPendings/context/contextPendings";

function MyApp({ Component, pageProps }) {
  const progress = new ProgressBar({
    size: 2,
    color: "#0357A4",
    className: "bar-of-progress",
    delay: 100,
  });

  Router.events.on("routeChangeStart", progress.start);
  Router.events.on("routeChangeComplete", progress.finish);
  Router.events.on("routeChangeError", progress.finish);

  const router = useRouter();
  useEffect(() => {
    dayjs.extend(relativeTime);
    dayjs.extend(LocalizedFormat);
    dayjs.locale("es-mx");
  }, []);

  return (
    // <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Provider store={store}>
      <MuiPickersUtilsProvider locale={"es-mx"} utils={MomentUtils}>
        <CommonFiltersProvider>
          <PendingsProvider>
            <SocketProvider>
              <Wrapper>
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={{
                    initial: {
                      opacity: 0,
                    },
                    animate: {
                      opacity: 1,
                    },
                  }}
                >
                  <Component {...pageProps} />
                </motion.div>
                <ToastContainer />
              </Wrapper>
            </SocketProvider>
          </PendingsProvider>
        </CommonFiltersProvider>
      </MuiPickersUtilsProvider>
    </Provider>
    // </ErrorBoundary>
  );
}

export default MyApp;
