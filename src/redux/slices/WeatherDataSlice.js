import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchWeatherData = createAsyncThunk("fetchWeatherData", async (_, { getState }) => {
    const state = getState();
    const type = state.wData.type;
    const query = state.wData.query;
    const response = await fetch(`https://api.weatherapi.com/v1/${type}.json?key=9593595eee804c038e862030240803&q=${query}&days=7&aqi=yes&alerts=yes`)
    const data = await response.json();
    return data
})

export const fetchWeekData = createAsyncThunk("fetchWeekData", async (_, { getState }) => {
    const state = getState();
    // const type = state.wData.type;
    const query = state.wData.query;
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${query}&key=ffe211295b624570b3797ff6fd6e623e`)
    const data = await response.json();
    return data
})

export const fetchSecondaryWeatherData = createAsyncThunk("fetchSecondaryWeatherData", async (_, { getState }) => {
    const state = getState();
    const type = state.wData.type;
    const query2 = state.wData.query2;
    const response = await fetch(`https://api.weatherapi.com/v1/${type}.json?key=9593595eee804c038e862030240803&q=${query2}&days=7&aqi=yes&alerts=yes`)
    const data = await response.json();
    return data
})

// const finalData= await fetchWeatherData()


const HomePageData = async () => {
    const query='Ambala'
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9593595eee804c038e862030240803&q=${query}&days=7&aqi=yes&alerts=yes`)
    const data = await response.json();
    return data
}

const HomePageWeekData = async () => {
    const query='Ambala'
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${query}&key=ffe211295b624570b3797ff6fd6e623e`)
    const data = await response.json();
    return data
}

// const ForecastData= async()=>{
//     const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Ambala?unitGroup=metric&include=days%2Ccurrent%2Calerts&key=UTYWZJBDXR83KQSNN7FDSD73C&contentType=json")
//     const data = await response.json();
//     return data
// }

const dataInitial = await HomePageData()

const initialWeekData = await HomePageWeekData()

const initialState = {
    type: "current",
    query: 'Ambala',
    query2:"",
    loading:false,
    error:null,
    mainData: dataInitial,
    secondayData:[],
    weekData:initialWeekData,
    Next7Days:true
    // homeData:finalData
}

const weatherDataSlice = createSlice({
    name: "Weather_Data",
    initialState,
    reducers: {
        updateQuery: (state, action) => {
            state.query = action.payload
            // state.type = action.payload
        },
        updateQuery2: (state, action) => {
            state.query2 = action.payload
            // state.type = action.payload
        },
        daysDataHandler:(state,action) => {
            state.Next7Days=!state.Next7Days;
          }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchWeatherData.pending, (state) => {
            // state.mainData = action.payload
            state.loading=true
            state.error=null
        })
        .addCase(fetchWeatherData.fulfilled, (state, action) => {
            state.loading=false
            state.mainData = action.payload
            // state.secondayData=action.payload
        })
        .addCase(fetchWeekData.fulfilled, (state, action) => {
            state.loading=false
            state.weekData = action.payload
            // state.secondayData=action.payload
        })
        .addCase(fetchSecondaryWeatherData.fulfilled, (state, action) => {
            state.loading=false
            state.secondayData.push(action.payload)
        })
        .addCase(fetchWeatherData.rejected, (state, action) => {
            state.loading=false
            state.error=action.error.message
        })
    },
    // extraReducers:(builder)=>{
    //     builder
    //     .addCase(fetchSecondaryWeatherData.fulfilled, (state, action) => {
    //         state.loading=false
    //         state.secondayData=action.payload
    //     })
    // }
})

export const { updateQuery,updateQuery2,daysDataHandler } = weatherDataSlice.actions

export default weatherDataSlice.reducer

