import axios from "axios"

const apiInstance = axios.create({
	baseURL: "https://restcountries.eu/rest/v2",
})

export const getCountries = async () => {
    try{
        const{data} = await apiInstance.get("all")
        return data.map(country => country.name)
    }catch(err){
        console.log(err)
    }
}
