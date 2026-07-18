import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './App.css'

function App() {
  // ---- STATE ----
  // amount        -> what the user types into the "From" box
  // from / to     -> currently selected currency codes (e.g. "usd", "inr")
  // convertedAmount -> result shown (read-only) in the "To" box
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  // ---- CUSTOM HOOK ----
  // useCurrencyInfo(from) fetches conversion rates FOR the "from" currency.
  // e.g. if from = "usd", currencyInfo = { usd: 1, inr: 83.2, eur: 0.91, ... }
  const currencyInfo = useCurrencyInfo(from)

  // Object.keys() turns { usd: 1, inr: 83.2, ... } into ["usd", "inr", ...]
  // This becomes the list of options shown in both dropdowns.
  const options = Object.keys(currencyInfo)

  // ---- SWAP LOGIC ----
  // Swapping just flips "from" <-> "to" AND flips amount <-> convertedAmount
  // so the UI feels instant (no need to re-fetch before showing something).
  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  // ---- CONVERSION LOGIC ----
  // currencyInfo[to] is the exchange rate from "from" -> "to".
  // e.g. currencyInfo["inr"] might be 83.2, meaning 1 usd = 83.2 inr.
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    // Full-screen background image container
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/7412102/pexels-photo-7412102.jpeg')`,
      }}
    >
      <div className="w-full">
        {/* Glassmorphism card: semi-transparent bg + blur */}
        <div className="w-full max-w-md mx-auto border border-gray-300 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault() // stop page reload (default form behavior)
              convert()          // run our conversion instead
            }}
          >
            {/* FROM box: user types amount + picks source currency */}
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>

            {/* Swap button, absolutely centered between the two boxes */}
            <div className="relative w-full h-0.5">
              <button
                type="button" // IMPORTANT: type="button" so it does NOT submit the form
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>

            {/* TO box: shows the converted result, amount is disabled (read-only) */}
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable // <- disables typing; this box only DISPLAYS a result
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App