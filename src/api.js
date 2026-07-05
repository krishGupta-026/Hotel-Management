const API_URL = 'https://demohotelsapi.pythonanywhere.com/hotels/'

export async function fetchHotels() {
  const res = await fetch(API_URL)
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }
  const json = await res.json()
  return json.data ?? []
}
