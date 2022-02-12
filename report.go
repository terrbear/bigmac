package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"os"
	"strconv"
)

func must(err error) {
	if err != nil {
		panic(err)
	}
}

const (
	ColDate         = 0
	ColCurrencyCode = 2
	ColName         = 3
	ColLocalPrice   = 4
)

//date,iso_a3,currency_code,name,local_price,dollar_ex,dollar_price,USD_raw,EUR_raw,GBP_raw,JPY_raw,CNY_raw,GDP_dollar,adj_price,USD_adjusted,EUR_adjusted,GBP_adjusted,JPY_adjusted,CNY_adjusted
//2000-04-01,ARG,ARS,Argentina,2.5,1,2.5,-0.00398,0.05007,-0.16722,-0.09864,1.09091,,,,,,,
type BigMacIndex struct {
	Year       int     `json:"year"`
	Currency   string  `json:"currency"`
	Name       string  `json:"name"`
	LocalPrice float64 `json:"localPrice"`
}

func main() {
	f, err := os.Open("big-mac-full-index.csv")
	must(err)
	defer f.Close()

	r := csv.NewReader(f)
	rows, err := r.ReadAll()
	must(err)

	bmis := make(map[int]map[string]BigMacIndex, 0)
	for _, row := range rows[1:] {
		year, err := strconv.Atoi(row[ColDate][:4])
		must(err)

		price, err := strconv.ParseFloat(row[ColLocalPrice], 64)
		must(err)

		if _, ok := bmis[year]; !ok {
			bmis[year] = make(map[string]BigMacIndex)
		}

		bmis[year][row[ColCurrencyCode]] = BigMacIndex{
			Year:       year,
			Currency:   row[ColCurrencyCode],
			Name:       row[ColName],
			LocalPrice: price,
		}
	}

	out, err := os.OpenFile("big-mac-index.json", os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0644)
	must(err)
	defer out.Close()

	w := json.NewEncoder(out)
	must(w.Encode(bmis))

	fmt.Println("bye!")
}
