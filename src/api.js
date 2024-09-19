export async function getPrediction(latitude,longitude) {
    const response= await fetch('http://127.0.0.1:5000/predict',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({latitude,longitude}),
    });
    
    if(!response.ok){
        throw new Error('Response Was Not Ok')
    }
    
    return response.json()
}