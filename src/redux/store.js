    import {configureStore} from '@reduxjs/toolkit'
    import weatherDataSlice from "./slices/WeatherDataSlice"

    export const store = configureStore({
        reducer:{
            wData:weatherDataSlice,
        }
    })