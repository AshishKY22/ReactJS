import React, { useId } from 'react'

function InputBox({
    label,
    amount,
    onAmountChange,       // callback: parent decides what happens when amount changes
    onCurrencyChange,     // callback: parent decides what happens when currency changes
    currencyOptions = [], // list of currency codes to populate <select>
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
  // useId() generates a unique, stable ID per component instance.
  // Needed to correctly link <label htmlFor> to <input id> for accessibility,
  // since we render TWO InputBox instances (From/To) — can't hardcode an id.
  const amountInputId = useId();

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    // Number(...) converts the string from e.target.value into a number,
                    // then hands it to the parent's callback (if provided).
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>

            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">
                    Currency Type
                </p>

                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    // NOTE: must be onChange (a real DOM event), NOT onCurrencyChange
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                    {currencyOptions.map((currency) => (
                        // key is required by React whenever rendering a list,
                        // so it can track which item is which across re-renders.
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;