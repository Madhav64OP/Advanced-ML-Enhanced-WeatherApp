import React from 'react'

function OtherCities({data}) {
  // console.log(props)
  return (
    <div className='bg-[#1B1B1D] text-[#fff] rounded-xl flex-col w-[279.2px] p-5 max-h-[75px] text-xs justify-between items-center' id='city_card_dashboard'>
        <div id="country_name" className='mb-[-12px] mt-[-14px] text-[#777777] flex-col'>
            <p className='font-bold'>{data?.location.country}</p>
            {/* {"props.data.location.country"} */}
        </div>
        <div id="city_name_and_icon" className='flex justify-between items-center font-medium text-base '>
            <h3>{data?.location.name}</h3>{/* */}
            <img src={data?.current.condition.icon} alt="weather_status_icon" className='w-12'/>
        </div>
        <div id="city_status" className='mt-[-10px] text-[#EFEFEF] opacity-[0.7]'>
            <p>{data?.current.condition.text}</p>{/* */}
            
        </div>
    </div>
  )
}

export default OtherCities