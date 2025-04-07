import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./slices/alertSlice";
import { commonSlice } from "./slices/commonSlice";
import { companySlice } from "./slices/companySlice";
import { dashboardDirector } from "./slices/dashboardDirector";
import dashboardManager from "./slices/dashboardManager";
import dashboardSlice from "./slices/dashboardSlice";
import dialogReducer from "./slices/dialogSlice"; //import our reducer from step 4
import ejecutivosSlice from "./slices/ejecutivosSlice";
import { groupsSlice } from "./slices/groups";
import importsSlice from "./slices/importsSlice";
import notificationsSlice from "./slices/notificationSlice";
import { ordersSlice } from "./slices/orders";
import quotesSlice from "./slices/quotesSlice"; //import our reducer from step 4
import { slopesSlice } from "./slices/slopesSlice";
import dashboardViewExecutiveSlice from "./slices/dashboardViewExecutiveSlice"; //import our reducer from step 4
import trackingSlice from "./slices/trackingSlice";
import { userSlice } from "./slices/userSlice"; //import our reducer from step 4
import { globalNotificationsSlice } from "./slices/globalNotificationsSlice";
import postTrakingsSlice from "./slices/postTrakingsSlice";
import { commentNotificationsSlice } from "./slices/commentNotificationSlice";
import { notificationcenterSlice } from "./slices/notificationcenterSlice";

export default configureStore({
  reducer: {
    dialog: dialogReducer,
    user: userSlice.reducer,
    executives: ejecutivosSlice,
    company: companySlice.reducer,
    imports: importsSlice,
    groups: groupsSlice,
    dashboard: dashboardSlice,
    quotes: quotesSlice,
    common: commonSlice.reducer,
    globalnotifications: globalNotificationsSlice.reducer,
    tracking: trackingSlice,
    slopes: slopesSlice.reducer,
    alert: alertSlice,
    dashboardmanager: dashboardManager,
    notifications: notificationsSlice,
    notificationscenter: notificationcenterSlice.reducer,
    commentsnotifications: commentNotificationsSlice.reducer,
    orders: ordersSlice.reducer,
    dashboarddirector: dashboardDirector.reducer,
    dashboardviewexecutive: dashboardViewExecutiveSlice,
    postsTrakings: postTrakingsSlice,
  },
});
