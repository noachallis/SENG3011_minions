import axios from "axios"

export const data = async () => {
    const data = await axios.get("http://127.0.0.1:8000/v1/covid/dates?regex=....-..-..")
}