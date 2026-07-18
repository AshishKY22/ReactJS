import { useEffect, useState } from "react"

// A "custom hook" is just a normal function that starts with "use"
// and internally calls other hooks (useState/useEffect here).
// It lets us reuse this fetching logic anywhere just by calling
// useCurrencyInfo("usd") and getting data back.
function useCurrencyInfo(currency) {
    const [data, setData] = useState({})

    useEffect(() => {
        // Fetches live exchange rates for the given currency.
        // Response shape: { date: "...", usd: { inr: 83.2, eur: 0.91, ... } }
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => res.json())
            .then((res) => setData(res[currency])) // grab just the rates object
            .catch((err) => console.error("Currency fetch failed:", err))

        // Runs again whenever "currency" changes (e.g. user picks a new "from")
    }, [currency])

    return data
}

export default useCurrencyInfo