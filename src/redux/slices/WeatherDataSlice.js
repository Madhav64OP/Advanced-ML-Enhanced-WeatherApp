import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
const weatherBitKey = import.meta.env.VITE_WEATHER_BIT_API;
const weatherApiKey = import.meta.env.VITE_WEATHER_API;

export const fetchWeatherData = createAsyncThunk("fetchWeatherData", async (_, { getState }) => {
    const state = getState();
    const type = state.wData.type;
    const query = state.wData.query;
    const response = await fetch(`https://api.weatherapi.com/v1/${type}.json?key=${weatherApiKey}&q=${query}&days=7&aqi=yes&alerts=yes`)
    const data = await response.json();
    return data
})

export const fetchWeekData = createAsyncThunk("fetchWeekData", async (_, { getState }) => {
    const state = getState();
    const query = state.wData.query;
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${query}&key=${weatherBitKey}`)
    const data = await response.json();
    return data
})

export const fetchSecondaryWeatherData = createAsyncThunk("fetchSecondaryWeatherData", async (_, { getState }) => {
    const state = getState();
    const type = state.wData.type;
    const query2 = state.wData.query2;
    const response = await fetch(`https://api.weatherapi.com/v1/${type}.json?key=${weatherApiKey}&q=${query2}&days=7&aqi=yes&alerts=yes`)
    const data = await response.json();
    return data
})


const HomePageData = async () => {
    const query = 'Ambala'
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${query}&days=7&aqi=yes&alerts=yes`)
    const data = await response.json();
    return data
}

const HomePageWeekData = async () => {
    const query = 'Ambala'
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${query}&key=${weatherBitKey}`)
    const data = await response.json();
    return data
}


const dataInitial = await HomePageData()

const initialWeekData = await HomePageWeekData()

const initialState = {
    type: "current",
    query: 'Ambala',
    query2: "",
    loading: false,
    error: null,
    mainData: dataInitial,
    secondayData: [],
    weekData: initialWeekData,
    Next7Days: true
}

const weatherDataSlice = createSlice({
    name: "Weather_Data",
    initialState,
    reducers: {
        updateQuery: (state, action) => {
            state.query = action.payload
        },
        updateQuery2: (state, action) => {
            state.query2 = action.payload
        },
        daysDataHandler: (state, action) => {
            state.Next7Days = !state.Next7Days;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.loading = false
                state.mainData = action.payload
            })
            .addCase(fetchWeekData.fulfilled, (state, action) => {
                state.loading = false
                state.weekData = action.payload
            })
            .addCase(fetchSecondaryWeatherData.fulfilled, (state, action) => {
                state.loading = false
                state.secondayData.push(action.payload)
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },

})

export const { updateQuery, updateQuery2, daysDataHandler } = weatherDataSlice.actions

export default weatherDataSlice.reducer

